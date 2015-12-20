#lang pollen
◊define-meta[title]{All Posts}

◊a[#:href "/tags/"]{Browse posts by tag}

◊; Pagetree acts as source of truth, so read posts from it
◊(define post-pagenodes (children 'pagetree-root (load-pagetree "index.ptree")))
◊; How should each post look in the list
◊(define (preview-post raw-post)
   (define post (string->symbol (string-append "posts/" (symbol->string raw-post))))
   `(li ,(pagenode->publish-date post)
        " - "
        (a [[href ,(pagenode->href post)]] ,(select-from-metas 'title post))))

◊(cons 'ul (map preview-post post-pagenodes))
