const handler = async ({ body }) => {
	try {
		

		return new Response({ data: "Hello" }, { status: 200 });
	} catch (error) {
		return new Response(error, { status: 500 })
	}
}

export { handler as GET, handler as POST };