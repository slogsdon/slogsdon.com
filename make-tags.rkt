#lang racket/base

(require "pollen.rkt"
         pollen/pagetree
         pollen/template
         racket/string)
(provide main)

(define tags (make-hash))
(define post-pagenodes (children 'pagetree-root
                                 (load-pagetree "posts/index.ptree")))

(define (update-tag-ref post)
  (λ (tag)
     (define current (hash-ref tags tag '()))
     (hash-set! tags tag (append current `(,post)))))

(define (tag-string->tags ts)
  (map (compose string->symbol string-trim) (string-split ts ",")))

(define (tag->string tag hyphenate?)
  (if hyphenate?
      (string-replace (symbol->string tag) " " "-")
      (symbol->string tag)))

(define (accumulate-tags post)
  (define post-tags (tag-string->tags (pagenode->tags post)))
  (map (update-tag-ref post) post-tags))

(define (prepare-post-path post)
  (string->symbol (string-append "posts/" (symbol->string post))))

(define (make-index-ptree)
  (define out (open-output-file "tags/index.ptree"
                                #:mode 'binary
                                #:exists 'replace))
  (define tag-list (foldl (lambda (tag acc)
                            (string-append
                             acc
                             (tag->string tag #t)
                             "/index.html\n")) "" (sort (hash-keys tags) symbol<?)))
  (display-header out)
  (display "index.html\n" out)
  (display tag-list out)
  (close-output-port out))

(define (make-index)
  (define out (open-output-file "tags/index.html.pm"
                                #:mode 'binary
                                #:exists 'replace))
  (define tag-list (foldl (lambda (tag acc)
                            (string-append
                             acc
                             "\t◊li{◊a[#:href \"/tags/"
                             (tag->string tag #t)
                             "/\"]{"
                             (tag->string tag #f)
                             "}}\n")) "" (sort (hash-keys tags) symbol<?)))
  (display-header out)
  (display-meta out "title" "Post Tags")
  (display-ul out tag-list)
  (close-output-port out))

(define (make-tag-index tag)
  (define dir (string-append "tags/" (tag->string tag #t)))
  (if (not (directory-exists? dir))
      (make-directory dir)
      #t)
  (define out (open-output-file (string-append "tags/" (tag->string tag #t) "/index.html.pm")
                                #:mode 'binary
                                #:exists 'replace))
  (define tag-list (foldl (λ (post acc)
                          (string-append
                           acc
                           "\t◊li{◊a[#:href \""
                           (pagenode->href post)
                           "\"]{"
                           (select-from-metas 'title post)
                           "}}\n")) "" (hash-ref tags tag)))
  (display-header out)
  (display-title out tag)
  (display-ul out tag-list)
  (close-output-port out))

(define (display-header out) (display "#lang pollen\n" out))
(define (display-meta out tag value)(display (string-append "◊define-meta[" tag "]{" value "}\n") out))
(define (display-title out tag)
  (display-meta out "title" (string-append "Posts tagged '" (tag->string tag #f) "'")))
(define (display-ul out items)
  (display (string-append
            "◊ul{\n"
            items
            "}\n") out))

(define (main)
  (map (compose accumulate-tags prepare-post-path) post-pagenodes)
  (make-index-ptree)
  (make-index)
  (map make-tag-index (sort (hash-keys tags) symbol<?))
  (display "Tag files generated.\n"))
