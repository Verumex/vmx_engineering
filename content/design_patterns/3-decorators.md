---
title: "Decorators"
metaTitle: "Decorators and Presenters"
---

## Decorators

The decorator pattern is well-established in the Rails community but
implementations vary in Rails applications. At VmX we use our own base decorator
class instead of leaning on more complex/heavy implementations like Draper.
You'll find the full base class implementation
[here](https://github.com/lockstep/rails_new/blob/master/app/decorators/application_decorator.rb),
and this is what a typical decorator class might look like:

```ruby
class BookDecorator < ApplicationDecorator
  forward :author_name, :title

  def parameterized_title
    title&.parameterize
  end
end

decorated_book = BookDecorator.new(book)
```

---

## Presenters

We also make the distinction between decorators and presenters, but we
explicitly acknowledge their relationship in that our
[base presenter](https://github.com/lockstep/rails_new/blob/master/app/presenters/application_presenter.rb)
inherits from the `ApplicationDecorator`. Presenters are effectively decorators
that are specifically geared for presentational/UI logic, so they have
additional features beyond method forwarding (e.g. to enable direct use in route
methods and forms):

```ruby
class ApplicationPresenter < ApplicationDecorator
  include ActionView::Helpers::TagHelper
  include AbstractController::Translation

  # Allow presenters to be passed directly into url helpers and dom_id
  forward :id,
          :model_name,
          :to_key,
          :to_model,
          :to_param,
          :to_partial_path
  ...
end
```


