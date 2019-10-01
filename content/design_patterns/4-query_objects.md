---
title: "Query Objects"
metaTitle: "How we use Query Objects"
---

We use query objects extensively at VmX. Like decorators, query objects have
become a common means of extracting query concerns from controllers and models
in Rails applications but their implementation varies. In general our rule of
thumb is never to use `where` outside of query objects. From our internal
documentation:

> If your query includes anything other than `find` or `find_by`, it should be
> in a query object.

While this can seem annoying and restrictive at first, you'll find that it
dramatically limits the probability of a bad scope/lookup and the duplication
frequently associated with common AR queries, especially as you tune for
performance and need to centralize `includes`, raw SQL and other more advanced
query behavior.

We are also sympathetic to [this argument](https://gist.github.com/deanius/d0a02c0d30ea6dc9d658)
against the widespread use of `has_many`, and the robust usage of query objects
means you rarely miss that problematic convenience.

We haven't yet felt the need to standardize our query object structure into a
base class and examples abound online, but a typical example in our code base
might look something like this:

```ruby
class BooksQuery
  attr_accessor :relation

  def initialize(relation: Book.all)
    @relation = relation.includes(:author)
  end

  def published
    relation.where(publication_state: :published)
  end
end
```
