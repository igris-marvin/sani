import { motion } from "motion/react";
import { Button, Heading, Text } from "@radix-ui/themes";
import { FiArrowRight, FiMessageCircle, FiTool, FiTruck } from "react-icons/fi";
import { Link } from "react-router-dom";
import { imageAsset } from "../../assets/images";

export function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-20"
    >
      <Text as="p" size="2" color="grass" className="mb-3 uppercase tracking-[0.2em]">About Sani</Text>
      <Heading size="8" className="mb-5 max-w-3xl text-balance">
        Your destination for furniture that makes a space feel like home.
      </Heading>
      <Text as="p" size="4" color="gray" className="mb-12 max-w-3xl leading-7">
        Sani Enterprise brings together comfort, practical design and personal service.
        Explore a considered selection of furniture for the living room, bedroom and
        beyond, with our team on hand to help you choose.
      </Text>
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <img
          src={imageAsset("about.jpg")}
          alt="Furniture at Sani Enterprise"
          className="max-h-[440px] w-full rounded-3xl object-cover"
        />
        <div className="space-y-6">
          <Heading size="6">Here to help, from selection to setup</Heading>
          <Text as="p" color="gray" className="leading-7">
            Ask about custom furniture design, restoration, home consultation,
            delivery and installation. We want every piece to arrive in the right
            place and feel right at home.
          </Text>
          <div className="flex items-start gap-4 rounded-2xl border border-[#e7e1d6] bg-white p-5">
            <FiTool className="mt-1 shrink-0 text-xl text-[#c98756]" />
            <div>
              <p className="font-medium">Personal service</p>
              <p className="mt-1 text-sm text-slate-600">Talk to our team directly for product and delivery questions.</p>
            </div>
          </div>
          <Button asChild><Link to="/contact">Get in touch <FiArrowRight /></Link></Button>
        </div>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-[#e7e1d6] bg-white p-6">
          <FiTruck className="mb-4 text-2xl text-[#c98756]" />
          <Heading size="4" className="mb-2">Delivery and installation</Heading>
          <Text color="gray">Ask us about delivery options and help setting up your furniture.</Text>
        </div>
        <div className="rounded-2xl border border-[#e7e1d6] bg-white p-6">
          <FiMessageCircle className="mb-4 text-2xl text-[#c98756]" />
          <Heading size="4" className="mb-2">Direct communication</Heading>
          <Text color="gray">Orders are confirmed personally with our team through WhatsApp.</Text>
        </div>
      </div>
    </motion.div>
  );
}

export function Contact() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-5xl px-4 py-16 sm:px-6 md:py-24"
    >
      <div className="rounded-3xl border border-[#e7e1d6] bg-white p-8 shadow-sm sm:p-12">
        <Text as="p" size="2" color="grass" className="mb-3 uppercase tracking-[0.2em]">We’re here to help</Text>
        <Heading size="8" className="mb-4">Let’s talk furniture.</Heading>
        <Text as="p" size="4" color="gray" className="mb-8 max-w-xl leading-7">
          Questions about a product, an order or our services? Contact Sani Enterprise
          and speak directly with our team.
        </Text>
        <div className="flex flex-wrap items-center gap-4">
          <Button asChild size="3">
            <a href="https://wa.me/27658158002" target="_blank" rel="noreferrer">
              <FiMessageCircle /> Chat on WhatsApp
            </a>
          </Button>
          <a className="text-slate-600 hover:text-slate-950" href="tel:+27658158002">+27 65 815 8002</a>
        </div>
      </div>
    </motion.section>
  );
}
