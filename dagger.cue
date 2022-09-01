package ymarket

import (
	"dagger.io/dagger"

	"dagger.io/dagger/core"
	"universe.dagger.io/yarn"
)

dagger.#Plan & {
	actions: {
		// Load the mobile code
		mobile: core.#Source & {
			path: "./mobile"
			exclude: [
				"node_modules",
				"build",
				"*.cue",
				"*.md",
				".git",
			]
		}

		// Test
		test: {
			// Jest
			jest: yarn.#Script & {
				name:   "jest"
				source: actions.mobile.output
			}

			// Typecheck
			typecheck: yarn.#Script & {
				name:   "typecheck"
				source: actions.mobile.output
			}
		}
	}
}
