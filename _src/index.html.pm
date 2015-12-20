#lang pollen
◊(define number-of-recent-posts 5)
◊define-meta[title]{Shane Logsdon}

◊; Pagetree acts as source of truth, so read posts from it
◊(define post-pagenodes (children 'pagetree-root (load-pagetree "posts/index.ptree")))
◊; How should each post look in the list
◊(define (preview-post raw-post)
   (define post (string->symbol (string-append "posts/" (symbol->string raw-post))))
   `(li ,(pagenode->publish-date post)
        " - "
        (a [[href ,(pagenode->href post)]] ,(select-from-metas 'title post))))

I'm shane. I code things. Sometimes, I write about them here.

◊h2{Recent Posts}
◊(cons 'ul (map preview-post (take post-pagenodes number-of-recent-posts)))

◊a[#:href "/posts/"]{All Posts}
