require 'json'

tags = JSON.parse(File.read('./_site/tags.json'))
for tag in tags do
  File.open("tag/#{tag["slug"]}.md", 'w') do |f|
    f.puts "---"
    f.puts "layout: tag-archive"
    f.puts "title: #{tag["title"]} Archive"
    f.puts "tag: #{tag["tag"]}"
    f.puts "menu_hidden: true"
    f.puts "redirect_from:"
    f.puts "  - /tags/#{tag["slug"]}/"
    f.puts "  - /#{tag["slug"]}/"
    f.puts "---\n"
  end
end

puts "tag/*.md generated."
