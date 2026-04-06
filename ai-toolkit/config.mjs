/**
 * Configuração do AI Toolkit - Melhoria Contínua da Automação
 * Modelo OpenAI e paths dos artefatos do projeto.
 */
import 'dotenv/config';
import { openai } from '@ai-sdk/openai';

export const model = openai('gpt-4o');

export const PATHS = {
  rules: '.cursor/rules/architeture.mdc',
  adrs: 'docs/adr',
  referencias: 'docs/referencias',
  cases: 'docs/cases',
  specs: 'cypress/e2e',
  pages: 'cypress/support/pages',
  locators: 'cypress/support/locators',
  allureResults: 'allure-results',
  reports: 'ai-reports',
  inputs: 'ai-toolkit/inputs',
};
