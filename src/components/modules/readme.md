# `components > module` Directory

This directory is designated for organizing Vue Single File Components (SFC) based on specific modules and their sub-modules. Components within this directory are grouped according to their association with particular modules and sub-modules.

The purpose of this structure is to enhance the organization and maintainability of our codebase. By grouping related components together, it makes it easier to locate and manage components within the context of their usage.

## Structure

The `module` directory should contain subdirectories for each module and sub-module. Each subdirectory should then contain the Vue SFC related to that specific context.

We follow a flat file tree structure with a base directory for each module. For example:

```
> BaseModule
  BaseModuleHeader.vue
  BaseModuleBody.vue
  BaseModuleFooter.vue
```

When a module has sub-modules, we use the most common scope, followed by the more specific scope.
Example:
You have module named: 'Borrow'.

And it has some sub module: Prelist, Transaction, Borrowed, and History.
And every sub module has some actions or other sub module.
So your folder structure should be like this:

```
> BorrowHistory
  BorrowHistoryPage.vue
  BorrowHistoryFilter.vue
  BorrowHistoryButtons.vue
  BorrowHistoryTable.vue
```

The pattern:

> CommonSpecificMoreSpecificTheMostSpecific.vue

## Naming Convention

- Subdirectories should be named in `PascalCase`, combining the module and sub-module names.
- Vue SFC files should also be named in `PascalCase`, following the pattern `CommonSpecificMoreSpecificTheMostSpecific.vue`.
- Each component should be in its own file, with the filename matching the name of the component.
