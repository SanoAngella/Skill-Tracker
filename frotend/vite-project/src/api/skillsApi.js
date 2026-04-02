const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const getUrl = (path) => `${API_BASE_URL}${path}`;

const parseResponse = async (response) => {
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload?.message || "Request failed");
  }

  return payload;
};

export const getSkills = async () => {
  const response = await fetch(getUrl("/api/skills"));
  const payload = await parseResponse(response);
  return payload?.data ?? [];
};

export const getSkillById = async (id) => {
  const response = await fetch(getUrl(`/api/skills/${id}`));
  const payload = await parseResponse(response);
  return payload?.data ?? null;
};

export const createSkill = async (skill) => {
  const response = await fetch(getUrl("/api/skills"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(skill),
  });
  const payload = await parseResponse(response);
  return payload?.data;
};

export const deleteSkill = async (id) => {
  const response = await fetch(getUrl(`/api/skills/${id}`), {
    method: "DELETE",
  });
  await parseResponse(response);
}
