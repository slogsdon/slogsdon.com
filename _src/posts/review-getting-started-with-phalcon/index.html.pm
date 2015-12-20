#lang pollen
◊define-meta[title]{Review: Getting Started with Phalcon}
◊define-meta[author]{shane}
◊define-meta[publish-date]{2014-02-22}
◊define-meta[tags]{phalcon, php, review}

With most newcomers to development frameworks, acclimating to the idea of the model-view-controller (MVC) pattern can be one of the biggest challenges. The ◊a[#:href "http://phalconphp.com/"]{Phalcon PHP framework} pose an additional barrier to entry, installation. Having both of these to overcome, let's see how Stephan A. Miller brings the self-proclaimed "fastest PHP framework" to the masses in his new book, ◊strong{◊a[#:href "http://www.packtpub.com/getting-started-with-phalcon/book"]{Getting Started with Phalcon}}.

◊h2{Problem #1: Installation}

Miller logically begins his book with installing Phalcon. Since most people dread manually installing packages as it requires compiling software from their source, he eases them through this process by offering a step-by-step walkthrough, with sections for Windows, Mac OS, Linux, and FreeBSD.

All of the main operating systems are detailed, as well as the two prominent web servers used across the web, Apache and nginx. Readers of ◊strong{Getting Started with Phalcon} will be able to use the information contained in the first chapter to guide them throught he installation process for their development, testing, and production environments.

◊h2{Problem #2: MVC}

In the remaining four chapters, Miller explains the intricacies of using the MVC pattern with Phalcon with ease, building a blog application in the process.

Models, views, and controllers were explained so that newcomers to the MVC pattern could understand the benfit of the pattern, keeping this simple at the start and gradually adding more Phalcon-related goodness as the project and book progressed.

Miller made sure to keep his code examples concise and up-to-par with modern PHP coding standards. Below is an excerpt from the third chapter, specifically part of the ◊code{Posts} controller for the project:

◊highlight['php]{
<?php
public function searchAction()
{
    $numberPage = 1;
    if ($this->request->isPost()) {
        $query = Criteria::fromInput($this->di, "Posts", $_POST);
        $this->persistent->parameters = $query->getParams();
    } else {
        $numberPage = $this->request->getQuery("page", "int");
    }

    $parameters = $this->persistent->parameters;
    if (!is_array($parameters)) {
        $parameters = array();
    }
    $parameters["order"] = "id";

    $posts = Posts::find($parameters);
    if (count($posts) == 0) {
        $this->flash->notice("The search did not find any posts");
        return $this->dispatcher->forward(array(
            "controller" => "posts",
            "action" => "index"
        ));
    }

    $paginator = new Paginator(array(
        "data" => $posts,
        "limit"=> 10,
        "page" => $numberPage
    ));

    $this->view->page = $paginator->getPaginate();
}
?>
}

◊h2{Recap}

Overall, Stephan Miller's ◊strong{Getting Started with Phalcon} is an encompasing overview of the Phalcon PHP framework. While it doesn't cover all of the features or all of the technical details about the framework, it does cover the main points, models and ◊a[#:href "http://docs.phalconphp.com/en/latest/reference/phql.html"]{PHQL}, views and ◊a[#:href "http://docs.phalconphp.com/en/latest/reference/volt.html"]{Volt}, controllers, and dependency injection included.

I believe that Miller has acheived his goal of being able to empower developers, new and old, with the skills needed to create applications with Phalcon. While newer developers will naturally have more to learn, all PHP developers will be able to pick up this book and use it to learn this new-ish framework that has been steadily gaining steam in the PHP world.
