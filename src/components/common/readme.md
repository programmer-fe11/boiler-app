# `components > commons` Directory

This directory is designed for widespread usage throughout the project. It contains reusable Vue Single File Components (SFC) that are utilized in multiple locations.

The purpose of this structure is to promote code efficiency and maintainability. By centralizing common components, we can ensure consistency across the project and reduce the amount of duplicate code.

## Structure

The `commons` directory should contain Vue SFC that are used in more than one place in the application. These components should be general-purpose and not tied to any specific page or feature.

## Naming Convention

- Vue SFC files should be named in `PascalCase`.
- Each component should be in its own file, with the filename matching the name of the component.

## Usage

When creating a new component that will be used in multiple places, it should be added to this directory. Existing components in this directory can be imported and used in any other component or view in the project.

## Example

If we have a button that is used in multiple places with the same styling and behavior, it would be a good candidate for a common component. We would create a new file in this directory called `Button.vue`, and any other component could then import and use the `Button` component.
