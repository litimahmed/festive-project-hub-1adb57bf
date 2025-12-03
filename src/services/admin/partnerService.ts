import { PartnerPayload, PartnerResponse } from "@/types/admin/partner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

export const getAllPartners = async (): Promise<PartnerResponse[]> => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${API_BASE_URL}/home/partenaire/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { "Authorization": `Bearer ${accessToken}` }),
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch partners.");
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [data];
};

export const getPartner = async (partnerId: number): Promise<PartnerResponse> => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${API_BASE_URL}/home/partenaire/${partnerId}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { "Authorization": `Bearer ${accessToken}` }),
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch partner information.");
  }

  return response.json();
};

export const createPartner = async (
  payload: PartnerPayload
): Promise<PartnerResponse> => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${API_BASE_URL}/admins/partenaire/ajouter/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { "Authorization": `Bearer ${accessToken}` }),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to create partner.");
  }

  return response.json();
};

export const updatePartner = async (
  partnerId: number,
  payload: PartnerPayload
): Promise<PartnerResponse> => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${API_BASE_URL}/admins/partenaire/modifier/${partnerId}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { "Authorization": `Bearer ${accessToken}` }),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to update partner.");
  }

  return response.json();
};

export const deletePartner = async (partnerId: number): Promise<void> => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${API_BASE_URL}/admins/partenaire/supprimer/${partnerId}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { "Authorization": `Bearer ${accessToken}` }),
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to delete partner.");
  }
};
