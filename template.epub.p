◊(local-require racket/file racket/path racket/system pollen/render pollen/world)
◊(define latex-source
  (render (path->complete-path "index.poly.pm")
          (simple-form-path (build-path
                             (world:current-project-root)
                             'up
                             "template.ltx.p"))))
◊(define working-directory
  (build-path (current-directory) "pollen-latex-work"))
◊(unless (directory-exists? working-directory)
  (make-directory working-directory))
◊(current-directory working-directory)
◊(define temp-ltx-path "temp.ltx")
◊(define temp-output-path "temp.epub")
◊(display-to-file latex-source temp-ltx-path #:exists 'replace)
◊(define command (format "pandoc -s '~a' -o '~a'" temp-ltx-path temp-output-path))
◊(if (system command)
  (file->bytes temp-output-path)
  (error "pdflatex: rendering error"))
