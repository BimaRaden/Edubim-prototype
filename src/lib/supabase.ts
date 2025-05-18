import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function addMaterial(material: {
  title: string;
  content: string;
  imageUrl?: string;
  pdfUrl?: string;
  subject: string;
}) {
  const { data, error } = await supabase
    .from('materials')
    .insert([
      {
        title: material.title,
        content: material.content,
        image_url: material.imageUrl,
        pdf_url: material.pdfUrl,
        subject: material.subject
      }
    ])
    .select();

  if (error) throw error;
  return data[0];
}

export async function addQuestion(question: {
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  subject: string;
}) {
  const { data, error } = await supabase
    .from('questions')
    .insert([
      {
        text: question.text,
        options: question.options,
        correct_answer: question.correctAnswer,
        explanation: question.explanation,
        subject: question.subject
      }
    ])
    .select();

  if (error) throw error;
  return data[0];
}

export async function getMaterials() {
  const { data, error } = await supabase
    .from('materials')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getQuestions() {
  const { data, error } = await supabase
    .from('questions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}