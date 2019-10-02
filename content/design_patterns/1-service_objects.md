---
title: "Service Objects"
metaTitle: "VmX Engineering | Service Objects"
---

Many times refactoring code out of a controller, worker or rake task means
extracting code that takes some action, i.e. it actively "does something" like
publish an object or perform calculations.

This type of extraction leads to diverse implementation and naming issues. Take
for example a class that publishes a book, and consider the different ways we
might call it:

```ruby
BookPublisher.new(book).publish
BookPublisher.new(book).call
BookPublisher.publish(book)
BookPublisher.call(book)
BookPublisher.(book)
```

Even without considering different class/module naming options we have at least
five reasonable ways to instantiate and call this type of "action" class. At VmX
we refer to these as service objects, and standardize around the implicit call
pattern. So in `app/services` you'll find an `application_service.rb` base
object:

```ruby
class ApplicationService
  def self.call(*args)
    new(*args).call
  end
end
```

Which means all service objects throughout the application can have the same
canonical call signature, which we've selected as the most succinct and
elegant from among the options above:

```ruby
BookPublisher.(book)
```

And the implementation of service objects is as simple as adding a new class
with  `initialize` and `call` methods:

```ruby
class BookPublisher < ApplicationService
  def initialize(book)
    @book = book
  end

  def call
    @book.publish!
  end
end
```
