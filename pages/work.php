<?php
$this->layout('partials::layouts/main', [
  'title' => 'Work',
]);
$patentUrl =
    "http://appft.uspto.gov/netacgi/nph-Parser"
    . "?Sect1=PTO1&Sect2=HITOFF&d=PG01&p=1&u="
    . "%2Fnetahtml%2FPTO%2Fsrchnum.html&r=1&f="
    . "G&l=50&s1=%2220180060867%22.PGNR.&OS="
    . "DN/20180060867&RS=DN/20180060867";
?>

<main class="container" aria-labelledby="title">
    <h1 id="title">Work</h1>

    <article class="project">
        <!-- <Img sizes={data.secureSubmitImage.sizes} /> -->
        <h2>
            <a href="https://github.com/hps/heartland-tokenization" target="_blank">
                Secure Submit
            </a>
        </h2>

        <p>
            Heartland Payment System's JavaScript library provides single-use
            tokenization capabilities for card present and card not present
            merchants
        </p>

        <p>
            <a href="<?= $patentUrl; ?>" target="_blank">Patent Pending</a>
        </p>
    </article>

    <article class="project">
        <!-- <Img sizes={data.sapImage.sizes} /> -->
        <h2>
            <a href="https://github.com/slogsdon/sap" target="_blank">
                Sap
            </a>
        </h2>

        <p>
            Toolkit for Elixir web applications to accept and respond to HTTP
            requests by using a decision tree built with combinators.
        </p>
    </article>

    <hr />

    <p>See other contributions under these organizations:</p>

    <ul>
        <li>
            <a href="https://github.com/slogsdon" target="_blank">
                @slogsdon
            </a>
            on GitHub
        </li>
        <li>
            <a href="https://github.com/hps" target="_blank">
                @hps
            </a>
            on GitHub
        </li>
        <li>
            <a href="https://github.com/globalpayments" target="_blank">
                @globalpayments
            </a>
            on GitHub
        </li>
    </ul>
</main>
