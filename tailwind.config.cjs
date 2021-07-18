const config = {
	mode: "jit",
	purge: [
		"./src/**/*.{html,js,svelte,ts}",
	],
	theme: {
		extend: {
			colors:{
			'new-black':'#101820',
			'new-orange':'#F2AA4C'
			},
			fontFamily: {
			ruslan: ['Ruslan Display']
			}
		}
	},
	plugins: [],
};

module.exports = config;
