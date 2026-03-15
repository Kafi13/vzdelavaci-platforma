export interface KnowledgeCardType {
  id: string;
  page_slug: string;
  order_index: number;
  title: string;
  hook: string;
  mental_model: string;
  deep_dive: string;
  checkpoint_question: string;
  checkpoint_options: string[];
  correct_answer: string;
}
