// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type { BaseTranslation as BaseTranslationType, LocalizedString } from 'typesafe-i18n'

export type BaseTranslation = BaseTranslationType
export type BaseLocale = 'en'

export type Locales =
	| 'debug'
	| 'en'
	| 'fr'

export type Translation = RootTranslation

export type Translations = RootTranslation

type RootTranslation = {
	profile: {
		navigation: {
			/**
			 * P​r​o​f​i​l​e
			 */
			profile: string
			/**
			 * S​e​t​t​i​n​g​s
			 */
			settings: string
		}
		display: {
			/**
			 * N​a​m​e
			 */
			name: string
			/**
			 * A​v​a​t​a​r
			 */
			avatar: string
			/**
			 * E​m​a​i​l
			 */
			email: string
		}
		action: {
			/**
			 * A​c​t​i​o​n​s
			 */
			title: string
			/**
			 * L​o​g​o​u​t
			 */
			logout: string
			/**
			 * D​e​l​e​t​e​ ​A​c​c​o​u​n​t
			 */
			deleteAccount: string
		}
		changePassword: {
			/**
			 * C​h​a​n​g​e​ ​p​a​s​s​w​o​r​d
			 */
			title: string
			/**
			 * C​u​r​r​e​n​t​ ​p​a​s​s​w​o​r​d
			 */
			currentPassword: string
			/**
			 * N​e​w​ ​p​a​s​s​w​o​r​d
			 */
			newPassword: string
			/**
			 * C​o​n​f​i​r​m​ ​n​e​w​ ​p​a​s​s​w​o​r​d
			 */
			confirmNewPassword: string
			/**
			 * C​h​a​n​g​e​ ​p​a​s​s​w​o​r​d
			 */
			submit: string
		}
		settings: {
			/**
			 * L​a​n​g​u​a​g​e
			 */
			language: string
			/**
			 * T​h​e​m​e
			 */
			theme: string
			/**
			 * L​i​n​k​s
			 */
			links: string
		}
		themes: {
			/**
			 * L​i​g​h​t
			 */
			light: string
			/**
			 * D​a​r​k
			 */
			dark: string
			/**
			 * S​y​s​t​e​m
			 */
			auto: string
		}
	}
	project: {
		modal: {
			'new': {
				/**
				 * C​r​e​a​t​e​ ​n​e​w​ ​p​r​o​j​e​c​t
				 */
				title: string
				/**
				 * N​a​m​e
				 */
				name: string
			}
		}
		navigation: {
			/**
			 * O​v​e​r​v​i​e​w
			 */
			overview: string
			/**
			 * I​n​f​o​r​m​a​t​i​o​n​s
			 */
			info: string
			/**
			 * C​o​l​o​r​s
			 */
			colors: string
			/**
			 * T​h​e​m​e​s
			 */
			themes: string
		}
		overview: {
			info: {
				/**
				 * P​r​o​j​e​c​t
				 */
				title: string
				/**
				 * N​a​m​e
				 */
				name: string
				/**
				 * D​e​s​c​r​i​p​t​i​o​n
				 */
				description: string
				/**
				 * C​r​e​a​t​e​d​ ​a​t
				 */
				createdAt: string
				/**
				 * U​p​d​a​t​e​d​ ​a​t
				 */
				updatedAt: string
			}
			color: {
				/**
				 * C​o​l​o​r​s
				 */
				title: string
			}
			theme: {
				/**
				 * T​h​e​m​e​s
				 */
				title: string
			}
		}
		info: {
			form: {
				/**
				 * I​n​f​o​r​m​a​t​i​o​n​s
				 */
				title: string
				/**
				 * N​a​m​e
				 */
				name: string
				/**
				 * D​e​s​c​r​i​p​t​i​o​n
				 */
				description: string
			}
			prompt: {
				/**
				 * A​I​ ​I​n​t​r​o​d​u​c​t​i​o​n
				 */
				title: string
				/**
				 * I​n​s​t​r​u​c​t​i​o​n​s​ ​f​o​r​ ​n​a​m​e
				 */
				namePrompt: string
				/**
				 * S​h​o​u​l​d​ ​b​e​ ​o​r​i​g​i​n​a​l​ ​a​n​d​ ​s​h​o​r​t
				 */
				nameExample: string
				/**
				 * I​n​s​t​r​u​c​t​i​o​n​s​ ​f​o​r​ ​d​e​s​c​r​i​p​t​i​o​n
				 */
				descriptionPrompt: string
				/**
				 * S​h​o​u​l​d​ ​b​e​ ​s​i​m​p​l​e​,​ ​m​a​x​ ​2​ ​l​i​n​e​s
				 */
				descriptionExample: string
				/**
				 * I​n​s​t​r​u​c​t​i​o​n​s​ ​g​e​n​e​r​a​l
				 */
				generalPrompt: string
				/**
				 * S​h​o​u​l​d​ ​b​e​ ​i​n​ ​F​r​e​n​c​h
				 */
				generalExample: string
				/**
				 * I​n​s​t​r​u​c​t​i​o​n​s​ ​f​o​r​ ​c​o​l​o​r
				 */
				colorPrompt: string
				/**
				 * S​h​o​u​l​d​ ​b​e​ ​l​i​k​e​ ​p​a​s​t​e​l
				 */
				colorExample: string
				/**
				 * N​o​ ​g​e​n​e​r​a​l​ ​i​n​s​t​r​u​c​t​i​o​n​s
				 */
				noGeneralPrompt: string
				/**
				 * N​o​ ​i​n​s​t​r​u​c​t​i​o​n​s​ ​f​o​r​ ​n​a​m​e
				 */
				noNamePrompt: string
				/**
				 * N​o​ ​i​n​s​t​r​u​c​t​i​o​n​s​ ​f​o​r​ ​d​e​s​c​r​i​p​t​i​o​n
				 */
				noDescriptionPrompt: string
				/**
				 * N​o​ ​i​n​s​t​r​u​c​t​i​o​n​s​ ​f​o​r​ ​c​o​l​o​r
				 */
				noColorPrompt: string
			}
			action: {
				/**
				 * A​c​t​i​o​n​s
				 */
				title: string
				/**
				 * D​e​l​e​t​e​ ​t​h​e​ ​p​r​o​j​e​c​t
				 */
				'delete': string
			}
			activeSections: {
				/**
				 * A​c​t​i​v​e​ ​s​e​c​t​i​o​n​s
				 */
				title: string
			}
			modal: {
				'delete': {
					/**
					 * D​e​l​e​t​e​ ​t​h​e​ ​p​r​o​j​e​c​t
					 */
					title: string
					/**
					 * A​r​e​ ​y​o​u​ ​s​u​r​e​ ​t​o​ ​d​e​l​e​t​e​ ​t​h​i​s​ ​p​r​o​j​e​c​t​?
					 */
					message: string
				}
			}
		}
		color: {
			/**
			 * P​r​i​m​a​r​y
			 */
			primary: string
			/**
			 * S​e​c​o​n​d​a​r​y
			 */
			secondary: string
			/**
			 * S​p​e​c​i​a​l
			 */
			special: string
			/**
			 * N​o​ ​c​o​l​o​r
			 */
			empty: string
			modal: {
				create: {
					/**
					 * C​r​e​a​t​e​ ​a​ ​c​o​l​o​r
					 */
					title: string
				}
				edit: {
					/**
					 * E​d​i​t​ ​a​ ​c​o​l​o​r
					 */
					title: string
				}
				display: {
					/**
					 * N​a​m​e
					 */
					name: string
					/**
					 * C​o​l​o​r
					 */
					color: string
					/**
					 * D​e​s​c​r​i​p​t​i​o​n
					 */
					description: string
				}
				'delete': {
					/**
					 * D​e​l​e​t​e​ ​t​h​e​ ​c​o​l​o​r
					 */
					title: string
					/**
					 * A​r​e​ ​y​o​u​ ​s​u​r​e​ ​t​o​ ​d​e​l​e​t​e​ ​t​h​i​s​ ​c​o​l​o​r​?
					 */
					message: string
				}
			}
			picker: {
				/**
				 * C​u​r​r​e​n​t​ ​c​o​l​o​r
				 */
				title: string
				/**
				 * S​a​v​e​ ​c​o​l​o​r
				 */
				save: string
			}
		}
		theme: {
			/**
			 * C​o​l​o​r​s​ ​i​n​f​o​r​m​a​t​i​o​n​s
			 */
			infoColorsTheme: string
			/**
			 * N​e​w​ ​t​h​e​m​e
			 */
			newTheme: string
			/**
			 * N​o​ ​t​h​e​m​e
			 */
			empty: string
			modal: {
				theme: {
					create: {
						/**
						 * C​r​e​a​t​e​ ​a​ ​t​h​e​m​e
						 */
						title: string
					}
					edit: {
						/**
						 * E​d​i​t​ ​a​ ​t​h​e​m​e
						 */
						title: string
					}
					display: {
						/**
						 * N​a​m​e
						 */
						name: string
						/**
						 * D​e​s​c​r​i​p​t​i​o​n
						 */
						description: string
						/**
						 * T​y​p​e
						 */
						type: string
						/**
						 * S​e​l​e​c​t​ ​a​ ​t​y​p​e
						 */
						selectType: string
					}
					'delete': {
						/**
						 * D​e​l​e​t​e​ ​t​h​e​ ​t​h​e​m​e
						 */
						title: string
						/**
						 * A​r​e​ ​y​o​u​ ​s​u​r​e​ ​t​o​ ​d​e​l​e​t​e​ ​t​h​i​s​ ​t​h​e​m​e​?
						 */
						message: string
					}
				}
				color: {
					create: {
						/**
						 * C​r​e​a​t​e​ ​a​ ​t​h​e​m​e​ ​c​o​l​o​r
						 */
						title: string
					}
					edit: {
						/**
						 * E​d​i​t​ ​a​ ​t​h​e​m​e​ ​c​o​l​o​r
						 */
						title: string
					}
					display: {
						/**
						 * N​a​m​e
						 */
						name: string
						/**
						 * D​e​s​c​r​i​p​t​i​o​n
						 */
						description: string
						/**
						 * C​o​l​o​r
						 */
						color: string
					}
					'delete': {
						/**
						 * D​e​l​e​t​e​ ​t​h​e​ ​t​h​e​m​e​ ​c​o​l​o​r
						 */
						title: string
						/**
						 * A​r​e​ ​y​o​u​ ​s​u​r​e​ ​t​o​ ​d​e​l​e​t​e​ ​t​h​i​s​ ​t​h​e​m​e​ ​c​o​l​o​r​?
						 */
						message: string
					}
				}
				colorType: {
					/**
					 * N​o​ ​c​o​l​o​r​ ​t​y​p​e
					 */
					empty: string
					create: {
						/**
						 * C​r​e​a​t​e​ ​a​ ​c​o​l​o​r​ ​t​y​p​e
						 */
						title: string
					}
					edit: {
						/**
						 * E​d​i​t​ ​a​ ​c​o​l​o​r​ ​t​y​p​e
						 */
						title: string
					}
					display: {
						/**
						 * N​a​m​e
						 */
						name: string
						/**
						 * D​e​s​c​r​i​p​t​i​o​n
						 */
						description: string
					}
					'delete': {
						/**
						 * D​e​l​e​t​e​ ​t​h​e​ ​c​o​l​o​r​ ​t​y​p​e
						 */
						title: string
						/**
						 * A​r​e​ ​y​o​u​ ​s​u​r​e​ ​t​o​ ​d​e​l​e​t​e​ ​t​h​i​s​ ​c​o​l​o​r​ ​t​y​p​e​?
						 */
						message: string
					}
				}
			}
			type: {
				/**
				 * D​a​r​k
				 */
				dark: string
				/**
				 * L​i​g​h​t
				 */
				light: string
			}
		}
	}
	global: {
		button: {
			/**
			 * E​d​i​t
			 */
			edit: string
			/**
			 * D​e​l​e​t​e
			 */
			'delete': string
			/**
			 * C​a​n​c​e​l
			 */
			cancel: string
			/**
			 * C​r​e​a​t​e
			 */
			create: string
			/**
			 * Y​e​s
			 */
			yes: string
			/**
			 * N​o
			 */
			no: string
			/**
			 * N​e​w​ ​c​o​l​o​r
			 */
			newColor: string
		}
	}
}

export type TranslationFunctions = {
	profile: {
		navigation: {
			/**
			 * Profile
			 */
			profile: () => LocalizedString
			/**
			 * Settings
			 */
			settings: () => LocalizedString
		}
		display: {
			/**
			 * Name
			 */
			name: () => LocalizedString
			/**
			 * Avatar
			 */
			avatar: () => LocalizedString
			/**
			 * Email
			 */
			email: () => LocalizedString
		}
		action: {
			/**
			 * Actions
			 */
			title: () => LocalizedString
			/**
			 * Logout
			 */
			logout: () => LocalizedString
			/**
			 * Delete Account
			 */
			deleteAccount: () => LocalizedString
		}
		changePassword: {
			/**
			 * Change password
			 */
			title: () => LocalizedString
			/**
			 * Current password
			 */
			currentPassword: () => LocalizedString
			/**
			 * New password
			 */
			newPassword: () => LocalizedString
			/**
			 * Confirm new password
			 */
			confirmNewPassword: () => LocalizedString
			/**
			 * Change password
			 */
			submit: () => LocalizedString
		}
		settings: {
			/**
			 * Language
			 */
			language: () => LocalizedString
			/**
			 * Theme
			 */
			theme: () => LocalizedString
			/**
			 * Links
			 */
			links: () => LocalizedString
		}
		themes: {
			/**
			 * Light
			 */
			light: () => LocalizedString
			/**
			 * Dark
			 */
			dark: () => LocalizedString
			/**
			 * System
			 */
			auto: () => LocalizedString
		}
	}
	project: {
		modal: {
			'new': {
				/**
				 * Create new project
				 */
				title: () => LocalizedString
				/**
				 * Name
				 */
				name: () => LocalizedString
			}
		}
		navigation: {
			/**
			 * Overview
			 */
			overview: () => LocalizedString
			/**
			 * Informations
			 */
			info: () => LocalizedString
			/**
			 * Colors
			 */
			colors: () => LocalizedString
			/**
			 * Themes
			 */
			themes: () => LocalizedString
		}
		overview: {
			info: {
				/**
				 * Project
				 */
				title: () => LocalizedString
				/**
				 * Name
				 */
				name: () => LocalizedString
				/**
				 * Description
				 */
				description: () => LocalizedString
				/**
				 * Created at
				 */
				createdAt: () => LocalizedString
				/**
				 * Updated at
				 */
				updatedAt: () => LocalizedString
			}
			color: {
				/**
				 * Colors
				 */
				title: () => LocalizedString
			}
			theme: {
				/**
				 * Themes
				 */
				title: () => LocalizedString
			}
		}
		info: {
			form: {
				/**
				 * Informations
				 */
				title: () => LocalizedString
				/**
				 * Name
				 */
				name: () => LocalizedString
				/**
				 * Description
				 */
				description: () => LocalizedString
			}
			prompt: {
				/**
				 * AI Introduction
				 */
				title: () => LocalizedString
				/**
				 * Instructions for name
				 */
				namePrompt: () => LocalizedString
				/**
				 * Should be original and short
				 */
				nameExample: () => LocalizedString
				/**
				 * Instructions for description
				 */
				descriptionPrompt: () => LocalizedString
				/**
				 * Should be simple, max 2 lines
				 */
				descriptionExample: () => LocalizedString
				/**
				 * Instructions general
				 */
				generalPrompt: () => LocalizedString
				/**
				 * Should be in French
				 */
				generalExample: () => LocalizedString
				/**
				 * Instructions for color
				 */
				colorPrompt: () => LocalizedString
				/**
				 * Should be like pastel
				 */
				colorExample: () => LocalizedString
				/**
				 * No general instructions
				 */
				noGeneralPrompt: () => LocalizedString
				/**
				 * No instructions for name
				 */
				noNamePrompt: () => LocalizedString
				/**
				 * No instructions for description
				 */
				noDescriptionPrompt: () => LocalizedString
				/**
				 * No instructions for color
				 */
				noColorPrompt: () => LocalizedString
			}
			action: {
				/**
				 * Actions
				 */
				title: () => LocalizedString
				/**
				 * Delete the project
				 */
				'delete': () => LocalizedString
			}
			activeSections: {
				/**
				 * Active sections
				 */
				title: () => LocalizedString
			}
			modal: {
				'delete': {
					/**
					 * Delete the project
					 */
					title: () => LocalizedString
					/**
					 * Are you sure to delete this project?
					 */
					message: () => LocalizedString
				}
			}
		}
		color: {
			/**
			 * Primary
			 */
			primary: () => LocalizedString
			/**
			 * Secondary
			 */
			secondary: () => LocalizedString
			/**
			 * Special
			 */
			special: () => LocalizedString
			/**
			 * No color
			 */
			empty: () => LocalizedString
			modal: {
				create: {
					/**
					 * Create a color
					 */
					title: () => LocalizedString
				}
				edit: {
					/**
					 * Edit a color
					 */
					title: () => LocalizedString
				}
				display: {
					/**
					 * Name
					 */
					name: () => LocalizedString
					/**
					 * Color
					 */
					color: () => LocalizedString
					/**
					 * Description
					 */
					description: () => LocalizedString
				}
				'delete': {
					/**
					 * Delete the color
					 */
					title: () => LocalizedString
					/**
					 * Are you sure to delete this color?
					 */
					message: () => LocalizedString
				}
			}
			picker: {
				/**
				 * Current color
				 */
				title: () => LocalizedString
				/**
				 * Save color
				 */
				save: () => LocalizedString
			}
		}
		theme: {
			/**
			 * Colors informations
			 */
			infoColorsTheme: () => LocalizedString
			/**
			 * New theme
			 */
			newTheme: () => LocalizedString
			/**
			 * No theme
			 */
			empty: () => LocalizedString
			modal: {
				theme: {
					create: {
						/**
						 * Create a theme
						 */
						title: () => LocalizedString
					}
					edit: {
						/**
						 * Edit a theme
						 */
						title: () => LocalizedString
					}
					display: {
						/**
						 * Name
						 */
						name: () => LocalizedString
						/**
						 * Description
						 */
						description: () => LocalizedString
						/**
						 * Type
						 */
						type: () => LocalizedString
						/**
						 * Select a type
						 */
						selectType: () => LocalizedString
					}
					'delete': {
						/**
						 * Delete the theme
						 */
						title: () => LocalizedString
						/**
						 * Are you sure to delete this theme?
						 */
						message: () => LocalizedString
					}
				}
				color: {
					create: {
						/**
						 * Create a theme color
						 */
						title: () => LocalizedString
					}
					edit: {
						/**
						 * Edit a theme color
						 */
						title: () => LocalizedString
					}
					display: {
						/**
						 * Name
						 */
						name: () => LocalizedString
						/**
						 * Description
						 */
						description: () => LocalizedString
						/**
						 * Color
						 */
						color: () => LocalizedString
					}
					'delete': {
						/**
						 * Delete the theme color
						 */
						title: () => LocalizedString
						/**
						 * Are you sure to delete this theme color?
						 */
						message: () => LocalizedString
					}
				}
				colorType: {
					/**
					 * No color type
					 */
					empty: () => LocalizedString
					create: {
						/**
						 * Create a color type
						 */
						title: () => LocalizedString
					}
					edit: {
						/**
						 * Edit a color type
						 */
						title: () => LocalizedString
					}
					display: {
						/**
						 * Name
						 */
						name: () => LocalizedString
						/**
						 * Description
						 */
						description: () => LocalizedString
					}
					'delete': {
						/**
						 * Delete the color type
						 */
						title: () => LocalizedString
						/**
						 * Are you sure to delete this color type?
						 */
						message: () => LocalizedString
					}
				}
			}
			type: {
				/**
				 * Dark
				 */
				dark: () => LocalizedString
				/**
				 * Light
				 */
				light: () => LocalizedString
			}
		}
	}
	global: {
		button: {
			/**
			 * Edit
			 */
			edit: () => LocalizedString
			/**
			 * Delete
			 */
			'delete': () => LocalizedString
			/**
			 * Cancel
			 */
			cancel: () => LocalizedString
			/**
			 * Create
			 */
			create: () => LocalizedString
			/**
			 * Yes
			 */
			yes: () => LocalizedString
			/**
			 * No
			 */
			no: () => LocalizedString
			/**
			 * New color
			 */
			newColor: () => LocalizedString
		}
	}
}

export type Formatters = {}
