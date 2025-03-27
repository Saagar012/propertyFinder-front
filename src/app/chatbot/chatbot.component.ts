import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {
  isChatOpen: boolean = false;
  userInput: string = '';
  messages: { text: string | SafeHtml, sender: string, isPredefinedQuestion?: boolean }[] = [];
  showPredefinedQuestions: boolean = true;

  predefinedQuestions = [
    { 
      question: 'What types of properties do you have?', 
      answer: this.sanitizer.bypassSecurityTrustHtml(
        'We have apartments, villas, and commercial spaces. <a href="/catalog/sale" target="_blank" rel="noopener" class="property-link">Browse all available properties</a>'
      ),
      containsHtml: true
    },
    { 
      question: 'How can I contact you?', 
      answer: 'You can reach us at support@realestate.com or call +123-456-7890.' 
    },
    { 
      question: 'Do you offer financing options?', 
      answer: 'Not at the moment but we are thinking of expanding our services in this field in the future' 
    },
    { 
      question: 'Can I schedule a property visit?', 
      answer: this.sanitizer.bypassSecurityTrustHtml(
        'Absolutely! Please provide your details, and we will arrange a visit. ' +
        '<a href="https://calendly.com/abhujel-confederationcollege/property-visit" target="_blank" rel="noopener noreferrer" class="visit-link">Schedule a visit now</a>'
      ),
      containsHtml:true   
    },
  ];

  constructor(private sanitizer: DomSanitizer) {}

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
    if (this.isChatOpen) {
      this.clearChat();
    }
  }

  clearChat() {
    this.messages = [];
    this.showPredefinedQuestions = true;
    this.messages.push({ 
      text: 'Hello! How can I assist you today? Here are some common questions:', 
      sender: 'bot' 
    });
  }

  selectQuestion(questionText: string) {
    this.userInput = questionText;
    this.sendMessage();
  }

  sendMessage() {
    if (this.userInput.trim()) {
      this.messages.push({ text: this.userInput, sender: 'user' });
      this.showPredefinedQuestions = false;
      
      const response = this.getBotResponse(this.userInput);
      setTimeout(() => {
        this.messages.push({ text: response, sender: 'bot' });
      }, 500);
      
      this.userInput = '';
    }
  }

  getBotResponse(userInput: string): string | SafeHtml {
    const question = this.predefinedQuestions.find(q => 
      q.question.toLowerCase() === userInput.toLowerCase()
    );
    return question ? question.answer : 'Sorry, I don\'t understand that. Can you please rephrase?';
  }

  isSafeHtml(content: any): boolean {
    return content && typeof content !== 'string';
  }
}