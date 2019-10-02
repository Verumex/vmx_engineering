---
title: "Form Objects"
metaTitle: "VmX Engineering | Form Objects"
---

Our team has long been sympathetic to the widespread concerns around
ActiveRecord callbacks. We saw enough performance and complexity concerns
working in inherited projects at Lockstep to have a healthy distaste for
callbacks rivaled only by our fear of
[default_scope](https://andycroll.com/ruby/dont-use-default-scope/).

Among other things, callbacks are useful in pre and post-persistence logic
(typically in create or update actions). We fill this void—and generally
achieve good business logic extraction from controllers—through the use of
form objects, using our home-grown
[form object base class](https://github.com/lockstep/rails_new/blob/master/app/forms/application_form.rb):

```ruby
class ApplicationForm
  include ActiveModel::Model
  ...

  # @param resource [Object] - the resource wrapped by the form
  # @param params [Hash{String=>Object}] - the changeset
  def initialize(resource = self.class.resource_class.new, params = {})
    @resource = resource
    @params = params.to_h.with_indifferent_access
      .except('id', 'created_at', 'updated_at')
    @resource.assign_attributes(resource_attributes)
    super(form_attributes)
  end

  ...
end
```

This is one of the more complex base objects that we maintain, but it is
battle-tested at this point and highly useful.
