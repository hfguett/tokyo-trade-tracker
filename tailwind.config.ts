
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Enhanced trading theme colors
				trading: {
					'dark-blue': '#0a0d14',
					'blue': '#0f1419',
					'light-blue': '#151b26',
					'mint': '#10b981',
					'light-mint': '#34d399',
					'emerald': '#0d9488',
					'teal': '#14b8a6',
					'profit': '#10b981',
					'loss': '#ef4444',
					'neutral': '#64748b',
					'gray': '#374151',
					'dark-gray': '#1f2937'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					from: {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					to: {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-up': {
					from: {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					to: {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'glow-pulse': {
					'0%, 100%': {
						boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)'
					},
					'50%': {
						boxShadow: '0 0 30px rgba(16, 185, 129, 0.6)'
					}
				},
				'purple-glow-pulse': {
					'0%, 100%': {
						boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)'
					},
					'50%': {
						boxShadow: '0 0 30px rgba(139, 92, 246, 0.6)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'slide-up': 'slide-up 0.6s ease-out',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
				'purple-glow-pulse': 'purple-glow-pulse 2s ease-in-out infinite'
			},
			backgroundImage: {
				'gradient-trading': 'linear-gradient(135deg, #0a0d14 0%, #0f1419 25%, #151b26 50%, #1a202e 75%, #1e2533 100%)',
				'gradient-mint': 'linear-gradient(135deg, #0d9488 0%, #10b981 50%, #34d399 100%)',
				'gradient-purple': 'linear-gradient(135deg, #6b46c1 0%, #8b5cf6 50%, #a78bfa 100%)',
				'gradient-dark': 'linear-gradient(145deg, rgba(14, 20, 27, 0.9) 0%, rgba(20, 25, 35, 0.8) 100%)'
			},
			scale: {
				'102': '1.02'
			},
			boxShadow: {
				'mint-500/25': '0 0 25px rgba(16, 185, 129, 0.25)',
				'purple-500/25': '0 0 25px rgba(139, 92, 246, 0.25)',
				'green-500/20': '0 0 20px rgba(34, 197, 94, 0.2)',
				'red-500/20': '0 0 20px rgba(239, 68, 68, 0.2)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
