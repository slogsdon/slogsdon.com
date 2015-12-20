#lang racket/base

(require pollen/decode
         pollen/file
         pollen/pagetree
         pollen/pygments
         pollen/tag
         pollen/template
         racket/file
         racket/string
         txexpr)

(provide (all-defined-out)
         highlight
         file->string
         select-from-metas)

(module config racket/base
  (provide (all-defined-out))
  (define poly-targets '(html ltx pdf epub))
  (define project-root (build-path "_src"))
  (define (unpublished-path? path)
    (define path-string (path->string path))
    (cond
      [(equal? path-string "build.sh") #t]
      [(equal? (substring path-string (- (string-length path-string) 1)) "~") #t]
      [else #f])) )

(define (paragraphs elements)
  (detect-paragraphs elements
                     #:linebreak-proc (λ (elements) elements)))

(define (pagenode->href node)
  (string-append "/" (string-trim (path->string (->output-path node)) "index.html")))

(define (pagenode->publish-date node)
  (if (select-from-metas 'publish-date node)
      (select-from-metas 'publish-date node)
      ""))

(define (pagenode->tags node)
  (if (select-from-metas 'tags node)
      (select-from-metas 'tags node)
      ""))

(define (root . xs)
  `(section [[class "content"]] ,@(decode-elements
            xs
            #:txexpr-elements-proc paragraphs)))
