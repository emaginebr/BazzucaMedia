import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQ() {
    return (
        <section id="faq" className="py-20 px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-gray-400 text-lg">Everything you need to know about Social Bazzuca</p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-brand-gray/30">
              <AccordionTrigger className="text-white hover:text-brand-blue">
                How does the AI-powered scheduling work?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                Our AI analyzes your audience engagement patterns, optimal posting times, and content performance to automatically suggest the best times to post your content for maximum reach and engagement.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-brand-gray/30">
              <AccordionTrigger className="text-white hover:text-brand-blue">
                Which social media platforms do you support?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                We support all major social media platforms including Instagram, Facebook, Twitter, LinkedIn, YouTube, TikTok, and Pinterest. More platforms are being added regularly.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-brand-gray/30">
              <AccordionTrigger className="text-white hover:text-brand-blue">
                Can I try Social Bazzuca for free?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                Yes! We offer a completely free plan with up to 3 social accounts and 10 posts per month. You can also start a 14-day free trial of our Professional plan with no credit card required.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-brand-gray/30">
              <AccordionTrigger className="text-white hover:text-brand-blue">
                How detailed are the analytics reports?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                Our analytics provide comprehensive insights including engagement rates, reach, impressions, best performing content, audience demographics, optimal posting times, and custom reports you can export and share.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border-brand-gray/30">
              <AccordionTrigger className="text-white hover:text-brand-blue">
                Is there team collaboration support?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                Yes! Our Agency plan includes full team collaboration features with role-based permissions, approval workflows, team member management, and shared content calendars.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border-brand-gray/30">
              <AccordionTrigger className="text-white hover:text-brand-blue">
                What kind of customer support do you provide?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                We offer email support for all users, live chat support for Professional plan users, and priority phone support for Agency plan customers. Our support team is available 24/7.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    );
}