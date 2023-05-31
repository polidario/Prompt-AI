import Conversations from "@components/Conversations"

export default function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Talk to me
        <br className="max-md:hidden" />
        <span className="purple_gradient text-center"> to reminisce</span>
      </h1>

      <p className="desc text-center">
        This is an open-source AI prompting project made just for fun to allow users to reminisce the good old days when there was no TikTok yet.
      </p>

      <Conversations />
    </section>
  )
}
