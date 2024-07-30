import type { BaseTranslation } from "../i18n-types";

const en: BaseTranslation = {
  profile: {
    navigation: {
      profile: "Profile",
      settings: "Settings",
    },
    display: {
      name: "Name",
      avatar: "Avatar",
      email: "Email",
    },
    action: {
      title: "Actions",
      logout: "Logout",
      deleteAccount: "Delete Account",
    },
    changePassword: {
      title: "Change password",
      currentPassword: "Current password",
      newPassword: "New password",
      confirmNewPassword: "Confirm new password",
      submit: "Change password",
    },
    settings: {
      language: "Language",
      theme: "Theme",
      links: "Links",
    },
    themes: {
      light: "Light",
      dark: "Dark",
      auto: "System",
    },
  },
  project: {
    modal: {
      new: {
        title: "Create new project",
        name: "Name",
      },
    },
    navigation: {
      overview: "Overview",
      info: "Informations",
      colors: "Colors",
      themes: "Themes",
    },
    overview: {
      info: {
        title: "Project",
        name: "Name",
        description: "Description",
        createdAt: "Created at",
        updatedAt: "Updated at",
      },
      color: {
        title: "Colors",
      },
      theme: {
        title: "Themes",
      },
    },
    info: {
      form: {
        title: "Informations",
        name: "Name",
        description: "Description",
      },
      prompt: {
        title: "AI Introduction",
        namePrompt: "Instructions for name",
        nameExample: "Should be original and short",
        descriptionPrompt: "Instructions for description",
        descriptionExample: "Should be simple, max 2 lines",
        generalPrompt: "Instructions general",
        generalExample: "Should be in French",
        colorPrompt: "Instructions for color",
        colorExample: "Should be like pastel",
        noGeneralPrompt: "No general instructions",
        noNamePrompt: "No instructions for name",
        noDescriptionPrompt: "No instructions for description",
        noColorPrompt: "No instructions for color",
      },
      action: {
        title: "Actions",
        delete: "Delete the project",
      },
      activeSections: {
        title: "Active sections",
      },
      modal: {
        delete: {
          title: "Delete the project",
          message: "Are you sure to delete this project?",
        },
      },
    },
    color: {
      primary: "Primary",
      secondary: "Secondary",
      special: "Special",
      empty: "No color",
      modal: {
        create: {
          title: "Create a color",
        },
        edit: {
          title: "Edit a color",
        },
        display: {
          name: "Name",
          color: "Color",
          description: "Description",
        },
        delete: {
          title: "Delete the color",
          message: "Are you sure to delete this color?",
        },
      },
      picker: {
        title: "Current color",
        save: "Save color",
      },
    },
    theme: {
      infoColorsTheme: "Colors informations",
      newTheme: "New theme",
      empty: "No theme",
      modal: {
        theme: {
          create: {
            title: "Create a theme",
          },
          edit: {
            title: "Edit a theme",
          },
          display: {
            name: "Name",
            description: "Description",
            type: "Type",
            selectType: "Select a type",
          },
          delete: {
            title: "Delete the theme",
            message: "Are you sure to delete this theme?",
          },
        },
        color: {
          create: {
            title: "Create a theme color",
          },
          edit: {
            title: "Edit a theme color",
          },
          display: {
            name: "Name",
            description: "Description",
            color: "Color",
          },
          delete: {
            title: "Delete the theme color",
            message: "Are you sure to delete this theme color?",
          },
        },
        colorType: {
          empty: "No color type",
          create: {
            title: "Create a color type",
          },
          edit: {
            title: "Edit a color type",
          },
          display: {
            name: "Name",
            description: "Description",
            type: "Type",
            selectType: "Select a type",
          },
          delete: {
            title: "Delete the color type",
            message: "Are you sure to delete this color type?",
          },
        },
      },
      type: {
        dark: "Dark",
        light: "Light",
      },
    },
  },
  global: {
    button: {
      edit: "Edit",
      delete: "Delete",
      cancel: "Cancel",
      create: "Create",
      yes: "Yes",
      no: "No",
      newColor: "New color",
    },
  },
};

export default en;
