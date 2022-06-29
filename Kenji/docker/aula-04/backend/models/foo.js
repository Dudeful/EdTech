const { Schema, model } = require('mongoose');

const fooSchema = new Schema(
	{
		foo: { type: String, required: true },
	},
	{ timestamps: true }
);

const Foo = model('Foo', fooSchema);

module.exports = Foo;
