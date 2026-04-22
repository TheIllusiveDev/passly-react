import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuthStore } from "../store/useAuthStore";
import { X, Calendar, MapPin, Users, AlignLeft, Type } from "lucide-react";

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateEventModal = ({
  isOpen,
  onClose,
}: CreateEventModalProps) => {};
