// tslint:disable:no-console
import * as React from "react";

interface IPaymentFormProps {
  buttonText?: string;
  onError?: (d: any) => void;
}

export default class PaymentForm extends React.Component<IPaymentFormProps> {
  protected payButton: HTMLButtonElement;
  protected results: HTMLPreElement;

  public constructor(props: IPaymentFormProps) {
    super(props);
    this.onBuyClicked = this.onBuyClicked.bind(this);
  }

  public render() {
    const buttonText = this.props.buttonText || "Pay Now";
    return (
      <div>
        <div>
          <button
            ref={(i) => this.payButton = i}
            onClick={this.onBuyClicked}
            style={{ display: "none" }}
          >
            {buttonText}
          </button>
        </div>
        <div><pre ref={(p) => this.results = p}></pre></div>
      </div>
    );
  }

  public componentDidMount() {
    if (!("PaymentRequest" in window)) {
      this.error("This browser does not support web payments.");
      return;
    }

    const request = this.createPaymentRequest();
    console.log(request);
    (request as any).canMakePayment()
      .then((result: any) => {
        console.log("canMakePayment response", result);
        if (!result) {
          this.error("Issue creating payment request.");
          return;
        }

        this.payButton.setAttribute("style", "display: inline;");
      })
      .catch((reason: any) => {
        console.log(reason);
        this.error("Cannot check if Google Pay is available.");
      });
  }

  private error(data: any) {
    if (this.props.onError) {
      this.props.onError(data);
    }
  }

  private createPaymentRequest() {
    const supportedInstruments = [
      {
        supportedMethods: ["basic-card"],
      },
      {
        data: {
          allowedPaymentMethods: ["CARD", "TOKENIZED_CARD"],
          apiVersion: 1,
          cardRequirements: {
            allowedCardNetworks: ["AMEX", "DISCOVER", "MASTERCARD", "VISA"],
            billingAddressFormat: "MIN",
            billingAddressRequired: true,
          },
          emailRequired: true,
          // If you do not yet have a merchant ID, uncomment the following line.
          environment: "TEST",
          // Place your own Google Pay merchant ID here. The merchant ID is tied to
          // the origin of the website.
          merchantId: "10490697845843384566",
          merchantName: "Google Pay Demo",
          paymentMethodTokenizationParameters: {
            parameters: {
              gateway: "globalpayments",
              gatewayMerchantId: "heartlandgpsandbox",
            },
            tokenizationType: "PAYMENT_GATEWAY",
          },
          phoneNumberRequired: true,
          shippingRequired: false,
        },
        supportedMethods: [
          "https://google.com/pay",
        ],
      },
    ];

    const details = {
      displayItems: [
        {
          amount: { currency: "USD", value: "2.00" },
          label: "Original donation amount",
        },
        {
          amount: { currency: "USD", value: "-1.00" },
          label: "Friends and family discount",
        },
      ],
      total: { label: "Donation", amount: { currency: "USD", value: "1.00" } },
    };

    const options = {
      requestPayerEmail: true,
      requestPayerName: true,
      requestPayerPhone: true,
      requestShipping: false,
    };

    console.log("supportedInstruments", supportedInstruments);
    console.log("details", details);
    console.log("options", options);
    return new PaymentRequest(supportedInstruments, details, options);
  }

  private onBuyClicked() {
    this.createPaymentRequest()
      .show()
      .then((response) => {
        console.log(response);
        this.sendPaymentToServer(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   * Simulates processing the payment data on the server.
   *
   * @param {PaymentResponse} instrumentResponse The payment information to
   * process.
   */
  private sendPaymentToServer(response: PaymentResponse) {
    fetch("http://localhost:8000/api/payment", {
      body: JSON.stringify({
          mobileType: "pay-with-google",
          response: response.toJSON(),
      }),
      method: "post",
    })
      .then((resp) => {
        response.complete("success")
          .then(() => {
            this.results.innerHTML = this.instrumentToJsonString(response);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  /**
   * Converts the payment instrument into a JSON string.
   *
   * @private
   * @param {PaymentResponse} instrument The instrument to convert.
   * @return {string} The JSON string representation of the instrument.
   */
  private instrumentToJsonString(response: PaymentResponse) {
      // var details = response.details;
      // details.cardNumber = "XXXX-XXXX-XXXX-" + details.cardNumber.substr(12);
      // details.cardSecurityCode = "***";

      // PaymentInsrument is an interface, but JSON.stringify works only on
      // dictionaries.
      return JSON.stringify(response.toJSON(), undefined, 2);
  }
}
