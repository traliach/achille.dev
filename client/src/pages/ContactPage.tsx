import { ContactSection } from '../components/home/ContactSection'
import { contactItems, contactTopics } from '../features/portfolio/content'
import { usePortfolioOutlet } from '../hooks/usePortfolioOutlet'

export function ContactPage() {
  const {
    contactForm,
    handleContactChange,
    handleContactSubmit,
    submitMessage,
    submitState,
  } = usePortfolioOutlet()

  return (
    <ContactSection
      contactForm={contactForm}
      contactItems={contactItems}
      contactTopics={contactTopics}
      onChange={handleContactChange}
      onSubmit={handleContactSubmit}
      submitMessage={submitMessage}
      submitState={submitState}
    />
  )
}
