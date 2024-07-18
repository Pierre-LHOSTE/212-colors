import type { BaseTranslation } from "../i18n-types";

const fr: BaseTranslation = {
  profile: {
    navigation: {
      profile: "Profil",
      settings: "Paramètres",
    },
    display: {
      name: "Nom",
      avatar: "Avatar",
      email: "Email",
    },
    action: {
      title: "Actions",
      logout: "Déconnexion",
      deleteAccount: "Supprimer le compte",
    },
    changePassword: {
      title: "Changer le mot de passe",
      currentPassword: "Mot de passe actuel",
      newPassword: "Nouveau mot de passe",
      confirmNewPassword: "Confirmer le nouveau mot de passe",
      submit: "Changer le mot de passe",
    },
    settings: {
      language: "Langue",
      theme: "Thème",
      links: "Liens",
    },
    themes: {
      light: "Clair",
      dark: "Sombre",
      auto: "Système",
    },
  },
  project: {
    modal: {
      new: {
        title: "Créer un nouveau projet",
        name: "Nom",
      },
    },
    navigation: {
      overview: "Vue d'ensemble",
      info: "Informations",
      colors: "Couleurs",
      themes: "Thèmes",
    },
    overview: {
      info: {
        title: "Projet",
        name: "Nom",
        description: "Description",
        createdAt: "Créé le",
        updatedAt: "Mis à jour le",
      },
      color: {
        title: "Couleurs",
      },
      theme: {
        title: "Thèmes",
      },
    },
    info: {
      form: {
        title: "Informations",
        name: "Nom",
        description: "Description",
      },
      prompt: {
        title: "Instructions de l'IA",
        namePrompt: "Instructions pour le nom",
        nameExample: "Doit être original et court",
        descriptionPrompt: "Instructions pour la description",
        descriptionExample: "Doit être simple, max 2 lignes",
        generalPrompt: "Instructions générales",
        generalExample: "Doit être en français",
        colorPrompt: "Instructions pour la couleur",
        colorExample: "Doit être de type pastel",
      },
      action: {
        title: "Actions",
        delete: "Supprimer le projet",
      },
      activeSections: {
        title: "Sections actives",
      },
      modal: {
        delete: {
          title: "Supprimer le projet",
          message: "Êtes-vous sûr de vouloir supprimer ce projet ?",
        },
      },
    },
    color: {
      primary: "Primaire",
      secondary: "Secondaire",
      special: "Spécial",
      modal: {
        create: {
          title: "Créer une couleur",
        },
        edit: {
          title: "Modifier une couleur",
        },
        display: {
          name: "Nom",
          color: "Couleur",
          description: "Description",
        },
        delete: {
          title: "Supprimer la couleur",
          message: "Êtes-vous sûr de vouloir supprimer cette couleur ?",
        },
      },
      picker: {
        title: "Couleur actuelle",
        save: "Enregistrer la couleur",
      },
    },
    theme: {
      infoColorsTheme: "Informations sur les couleurs",
      newTheme: "Nouveau thème",
      modal: {
        theme: {
          create: {
            title: "Créer un thème",
          },
          edit: {
            title: "Modifier un thème",
          },
          display: {
            name: "Nom",
            description: "Description",
            type: "Type",
            selectType: "Sélectionner un type",
          },
          delete: {
            title: "Supprimer le thème",
            message: "Êtes-vous sûr de vouloir supprimer ce thème ?",
          },
        },
        color: {
          create: {
            title: "Créer une couleur de thème",
          },
          edit: {
            title: "Modifier une couleur de thème",
          },
          display: {
            name: "Nom",
            description: "Description",
            color: "Couleur",
          },
          delete: {
            title: "Supprimer la couleur du thème",
            message:
              "Êtes-vous sûr de vouloir supprimer cette couleur de thème ?",
          },
        },
        colorType: {
          create: {
            title: "Créer un type de couleur",
          },
          edit: {
            title: "Modifier un type de couleur",
          },
          display: {
            name: "Nom",
            description: "Description",
          },
          delete: {
            title: "Supprimer le type de couleur",
            message: "Êtes-vous sûr de vouloir supprimer ce type de couleur ?",
          },
        },
      },
      type: {
        dark: "Sombre",
        light: "Clair",
      },
    },
  },
  global: {
    button: {
      edit: "Modifier",
      delete: "Supprimer",
      cancel: "Annuler",
      create: "Créer",
      yes: "Oui",
      no: "Non",
      newColor: "Nouvelle couleur",
    },
  },
};

export default fr;
