import { createAxiosInstance } from "@/lib/create-axios-instance";

const axiosInstance = createAxiosInstance();

export const getPolicy = async (): Promise<any> => {
  const { data } = await axiosInstance.get(
    `${process.env.NEXT_PUBLIC_POLICY}/all`
  );

  return data.data;
};

export const getPolicyDetail = async (id?: string): Promise<any> => {
  const { data } = await axiosInstance.get(
    `${process.env.NEXT_PUBLIC_POLICY}/${id}`
  );

  return data.data;
};

export const postPolicyComment = async (
  comment: string,
  id: string
): Promise<any> => {
  const { data } = await axiosInstance.post(
    `${process.env.NEXT_PUBLIC_POLICY}/${id}/comment`,
    { content: comment }
  );
  return data.data;
};

export const patchPolicyHate = async (id: string): Promise<any> => {
  const { data } = await axiosInstance.patch(
    `${process.env.NEXT_PUBLIC_POLICY}/${id}/hate`
  );

  console.log({ data }, "Hate!!!");

  return data.data;
};

export const patchPolicyLike = async (id: string): Promise<any> => {
  const { data } = await axiosInstance.patch(
    `${process.env.NEXT_PUBLIC_POLICY}/${id}/like`
  );

  console.log({ data }, "Like!!!");

  return data.data;
};