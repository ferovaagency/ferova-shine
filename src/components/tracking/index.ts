export { WhatsAppButton, default as WhatsAppButtonDefault } from './WhatsAppButton';
export type { WhatsAppButtonProps } from './WhatsAppButton';

export { QuoteButton, QuoteForm } from './QuoteButton';
export type { QuoteButtonProps, QuoteFormProps } from './QuoteButton';

export { ServiceCard } from './ServiceCard';
export type { ServiceCardProps } from './ServiceCard';

export { InteractiveTool } from './InteractiveTool';
export type { InteractiveToolProps, ToolTrackingApi } from './InteractiveTool';

export { Calculator } from './Calculator';
export type { CalculatorProps, CalculatorTrackingApi } from './Calculator';

export { ContactForm } from './ContactForm';
export type { ContactFormProps, ContactFormType, ContactMethod } from './ContactForm';

export {
  pushDataLayer,
  getScrollDepth,
  getTimeOnPage,
  getDeviceType,
  isReturningVisitor,
  initVisitorTracking,
  getCurrentServiceContext,
  setCurrentServiceContext,
} from './utils';
