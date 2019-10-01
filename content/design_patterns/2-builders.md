---
title: "Builders"
metaTitle: "Builders | A case for builder objects"
---

When markup becomes sufficiently complicated and needs to be generated based on
dynamically generated objects or recursive logic, we frequently see
`app/helpers` field increasingly complex responsibilities. Helpers were
never intended to play substantial roles in markup generation, but it is the
only place where we traditionally have direct access to tag helpers, route
methods and other UI tooling.

As an example, consider a dynamic list with items that may have sub-lists.
You might use a helper and implement something like the following pseudocode:

```ruby
def build_list(list_items)
  tag.ul do
    list_items.map{ |list_item| add_item(list_item) }
  end
end

def add_item(item)
  tag.li do
    capture do
      render_item(item)
      build_list(item.sub_items) if item.sub_items.present?
    end
  end
end
```

This example moved code into a helper to take advantage of recursive rendering,
which is hard to reproduce in markup. This presents a few problems:

1. Helpers are effectively a global namespace, so we're defining a bunch of
   methods that have no encapsulation or robust organization strategy
2. This helper is going to become fairly complex, and as helpers are modules
   we won't be able to leverage any re-usable state (i.e. instance variables)*
3. We lose some convenience in the ability to limit our interface (since
   `private` isn't readily applicable)*

<small>
* There are ways to reproduce this functionality in helpers but none that are
sufficiently idiomatic.
</small>

---

At VmX we move advanced rendering logic into `Builder` classes. In
`app/builders` you'll find the base `ApplicationBuilder` class:

```ruby
class ApplicationBuilder < ApplicationService
  include ActionView::Helpers::TagHelper
  include ActionView::Helpers::TextHelper
  include ActionView::Helpers::NumberHelper
  include ActionView::Context
  include AbstractController::Translation
  include Rails.application.routes.url_helpers
end
```

Note that builders inherit from services because they are related (services take
generic actions, builders take the specific action of constructing markup).

Now our list generation logic can be properly encapsulated and leverage all of
the class functionality you wanted in the helper:

```ruby
class ListBuilder < ApplicationBuilder
  def initialize(list_object)
    @list_object = list_object
  end

  def call
    build_list(list_object.list_items)
  end

  private

  def build_list(list_items)
    ...
  end

  def add_item(item)
    ...
  end
end
```
