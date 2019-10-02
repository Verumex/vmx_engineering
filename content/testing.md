---
title: "Testing Philosophy"
metaTitle: "VmX Engineering | Testing Philosophy"
---

Test-driven development is an essential strategy at VmX, but the term carries
the weight of many years of ambiguity and misuse. This manifesto/rant/diatribe
outlines our philosophy regarding what test-driven development means to us,
best practices and how we think about the relationship between automated tests
and our production code.

## Rationale

TDD has a mixed history of success in software. It is helpful to start with
the objectives and goals of a test-driven workflow, as well as explicitly
stating common pitfalls and antipatterns that we want to avoid.

### Objectives and Advantages

The primary purpose and objective of our testing workflow is to **mitigate
risk while maintaining high levels of productivity**. The VmX Platform is
relatively young, but already has tens of thousands of lines of code, hundreds
of classes and over 1,500 defined methods in addition to numerous third party
libraries that are regularly updated. Robust test workflows allow us to move
quickly and make large-scale changes while ensuring that our business logic is
maintained and user expectations are met within a continuously deployed
platform.

The alternative is a QA team running through manual QA scripts on every release,
which isn't conducive to our rapid pace and feature delivery schedules. We
need to know—in a matter of minutes—that _all_ parts of our application
are working as expected.

Many advantages are implied by this primary objective, but one
worth making explicit is **reducing fear**. The reason systems are frequently
saddled with chronic technical debt isn't because they lack resources or time
to refactor it out. Companies (usually business stakeholders) frequently
de-prioritize technical debt reduction because if the system is "more or less"
working as-is, they are _more afraid of regressions than technical debt_.
Having a high degree of confidence in our test suite means a perpetual high
level of confidence in refactors, technical debt paydown and other tasks that
lead to higher productivity and Developer Happiness<sup>TM</sup>.

### Antipatterns and Drawbacks

Test-driven development is notorious for a few antipatterns, myths and
disadvantages that we proactively avoid or address:

1. **It slows development:** Many dispute this as a myth. _But even if true_
   the marginal time required is well worth the advantages outlined above.
2. **Coupled test to production code:** This _is_ a problem as it can slow or
   confuse refactors, and the closer the specs approximate or dictate the
   implementation the _less effective they are in protecting business logic_.
   See the **Methodology** section below to see how we
   mitigate/eliminate this concern.
3. **False sense of security:** We must be vigilant not to over-rely on the
   test suite. It is _one_ mitigation tool against regressions, not the _only_
   mitigation tool.
4. **Disproportionate spec maintenance:** Frequent changes to the UI can
   require frequent and annoying spec changes if the specs are too specific,
   becoming a maintenance headache.
5. **It isn't clear what to test:** This is only true if you don't compose the
   tests _first_. The easiest way to avoid this ambiguity is to force your test
   suite to drive new logical changes instead of the other way around.
6. **It is hard to do well:** Yep!

## Definitions

Let's outline what comprises our test suite in the context of VmX to
facilitate a common understanding of how we think about spec architecture and
clarify the **Methodology** section below. We use RSpec to
compose and run our specs, which are broken into the following spec "types".
Pay attention to the order, these are listed from **high-level** to
**low-level** in our mental model:

1. **System specs:** These are the highest-level specs in our test suite.
   Referred to elsewhere as "integration" or "feature" specs, these are the most
   similar to what you'd find in a Cucumber/BDD environment. System specs behave
   most similarly to an actual user, interacting with a browser or a browser
   emulator and expecting to see specific content appear in the view. These are
   the slowest specs, but the most comprehensive in that they (usually) exercise
   the _entire_ application/system (view, router, controllers, services,
   database, etc), hence the name. A carefully-crafted system spec makes many
   lower-level specs redundant, **and therefore unnecessary**.

2. **Request specs:** A request spec is one step down from a system spec,
   exercising everything except for the view. The view (browser) is frequently
   the slowest component in the system spec so removing it makes request specs
   much faster, if not as comprehensive.

3. **Unit specs:** A unit spec or unit test is the lowest-level category,
   frequently testing a single attribute or method on a single class. If you
   want to make sure a service object responds appropriately to an unexpected
   argument, test form object logic in isolation or do something else similarly
   specific, unit specs can deliver this level of specificity in fast,
   context-specific state environments.

>NOTE: There are several other spec types (view specs, router specs, etc). We
>_don't or rarely use them_ because they are _almost_ always redundant with the
>three spec types outlined above (and arguably they are just alternative forms
>of unit testing).

## Methodology

Writing concise, comprehensive specs requires good judgement and a comprehensive
understanding of the feature at hand. Here is a brief playbook/checklist for
addressing a new feature (which means first composing the relevant spec):

1. **Start with high-level specs, work down the hierarchy to lower-level specs:**
   If you are working on brand-new functionality, odds are that you'll start
   with a system spec that captures the simplest "happy" case for the
   user. If you anticipate a corner case or failure flow, consider writing a
   system spec for it but _also consider dropping into a lower-level spec_. You
   should use the lowest-level spec possible that is
   _sufficiently comprehensive, non-redundant and ignorant of implementation
   details_.
2. **Test behavior, not implementation:** Note that in general low-level
   specs will dictate implementation (couple specs to production code) **more**
   than high-level specs, which is one reason you always start with a
   higher-level spec. When it comes to testing we care about _what the
   application does_, not _how it does it_.
3. **Do not write redundant specs:** If a system spec captures a user adding a
   book to a library and seeing it appear in the library, there would be no
   reason to add a request spec proving the `#create` action works or a unit
   spec proving books can belong to the library. You only need the single
   feature/system spec—it made the lower-level specs redundant at least for
   that particular happy case.
4. **Do not test aesthetics:** The UI/appearance of webpage is not a
   manifestation of business logic per se and is subject to frequent change, so
   the maintenance challenge of testing it outweighs its utility in mitigating
   risk. The automated suite is limited to testing logic and content, not UI
   styling (we lean on other tools for that, like [Percy](https://percy.io)).
   This means many PRs won't include spec changes, e.g. if they only include
   additional form fields, markup or styling. This is OK provided the core
   workflow/navigation through those forms or pages are already covered and
   still pass.
5. **Do not submit PRs without specs:** Keeping #4 in mind, if you submit a PR
   for review that contains new or changed business logic without a
   corresponding spec, it may be closed without review. We consider these
   incomplete by default at VmX.

Note that this approach will yield a relatively high number of
system and request specs but few unit specs (because they frequently become
redundant), and therefore a higher production to spec LOC ratio (for those of
you who care about such things). Our ratio is roughly 1:0.5, which is what we
generally expect. Despite fewer total specs this also makes the suite runtime
slower. We don't worry _too much_ about speed since you can easily run one
spec or file at a time during development, and we parallelize the suite
in our CI environments. The upshot is a test suite that is relatively easy to
maintain and highly correlated to business logic integrity, low technical debt,
easy refactors and the occasional orgasm when you get the spec _just right_.
