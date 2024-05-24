"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import PolicySwiper from "@/components/components/policy/policy-swiper";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { usePolicyRecommend } from "@/lib/hook/policy";

const selectedValueMapping: Record<string, string> = {
  역량개발: "COMPETENCY_DEVELOPMENT",
  생활지원: "LIVING_SUPPORT",
  활동지원: "ACTIVITY_SUPPORT",
  진로지원: "CAREER_SUPPORT",
};

export default function Policy() {
  const searchParams = useSearchParams();

  const target = searchParams.get("target") ?? "";
  const interest = searchParams.get("interest") ?? "";

  const [res, setRes] = useState<any>();
  const { mutate: policyRecommend } = usePolicyRecommend({
    onSuccess: (res) => {
      setRes(res);
    },
    onError: () => {
      alert("데이터 요청에 실패하였습니다.");
    },
  });

  useEffect(() => {
    if (target && interest) {
      policyRecommend({
        comment: selectedValueMapping[interest],
        target: "U",
      });
    }
  }, [policyRecommend, target, interest]);

  const router = useRouter();

  const mainImage: Record<string, string> = {
    역량개발: "/images/interestImage1.svg",
    생활지원: "/images/interestImage2.svg",
    활동지원: "/images/interestImage3.svg",
    진로지원: "/images/interestImage4.svg",
  };

  if (!res && !target && !interest) return;

  return (
    <Suspense fallback={<div></div>}>
      <div className="h-full bg-[#619EC9]">
        <div className="flex justify-center">
          <div
            className="flex items-center gap-2 pb-[13px] pt-[12px] hover:cursor-pointer"
            onClick={() => router.push("/reset")}
          >
            <Image
              className="rounded-full"
              src="/images/icon_profile.svg"
              alt="대상 이미지"
              width={25}
              height={25}
              style={{ height: 25 }}
            />
            <div className="text-sm text-white/50">
              {window.localStorage.getItem("대상")}
            </div>
          </div>
        </div>
        <div className="ml-[15px] mt-[12px] flex justify-center text-[26px]">
          <Select
            onValueChange={(value) => {
              router.push(`/policy/?target=${target}&interest=${value}`);
            }}
            defaultValue={interest}
          >
            <SelectTrigger className="w-28 border-none text-[26px] text-white/80">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="활동지원">활동지원</SelectItem>
                <SelectItem value="역량개발">역량개발</SelectItem>
                <SelectItem value="생활지원">생활지원</SelectItem>
                <SelectItem value="진로지원">진로지원</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="relative z-[1] mt-[12px] flex h-[100px] w-full justify-center">
          <Image
            className="object-cover"
            src={mainImage[interest]}
            alt="관심사 이미지"
            fill
            sizes="100vw"
          />
        </div>
        <div className="relative z-50 mt-0">
          <PolicySwiper policyCards={res} />
        </div>
        <div className="text-md flex justify-center">
          <div
            className="h-[48px] w-[121px] content-center rounded-[100px] border-[1px] border-solid border-white/60 px-4 text-center text-white/60 hover:cursor-pointer"
            onClick={() => router.push("/policy/list")}
          >
            카테고리 전체
          </div>
        </div>
      </div>
    </Suspense>
  );
}
