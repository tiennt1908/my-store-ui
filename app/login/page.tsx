"use client";

import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import { IFormRequire, useForm } from "@/customHooks/useForm";
import { actionAsyncLogin } from "@/redux/slices/auth.slice";
import { AppDispatch, RootState } from "@/redux/store";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { LoginInput } from "../api/auth/auth.input";
import { useRouter } from "next/navigation";
import { actionAsyncGetUserInfo } from "@/redux/slices/user.slice";

type LoginFormType = {
  phoneNumber: string;
  password: string;
};

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const initForm: LoginFormType = {
    phoneNumber: "",
    password: "",
  };

  const initRequire: IFormRequire = {
    phoneNumber: {
      isRequired: {
        value: true,
        message: "Yêu cầu không để trống",
      },
      pattern: {
        value: /^0[0-9]{9}$/,
        message: "Số điện thoại không hợp lệ",
      },
    },
    password: {
      isRequired: {
        value: true,
        message: "Yêu cầu không để trống",
      },
      minLength: {
        value: 6,
        message: "Mật khẩu phải có ít nhất 6 ký tự",
      },
      maxLength: {
        value: 32,
        message: "Mật khẩu tối đa 32 ký tự",
      },
    },
  };

  const { form, errors, handleSetForm, onSubmit } = useForm<LoginFormType>(
    initForm,
    initRequire
  );

  const login = (input: LoginInput) => {
    dispatch(actionAsyncLogin(input)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(actionAsyncGetUserInfo());
        router.push("/");
      }
    });
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="bg-white p-4 rounded shadow-sm" style={{ width: 450 }}>
        <p className="text-center">Đăng Nhập</p>
        <div className="mt-2 flex flex-col gap-2">
          <FormInput
            title="Số điện thoại*"
            placeholder="Vd: 0861234567"
            errorMessage={errors["phoneNumber"]?.message}
            onValue={(value: string) => {
              handleSetForm("phoneNumber", value);
            }}
          />
          <FormInput
            type="password"
            title="Mật khẩu*"
            placeholder="********"
            errorMessage={errors["password"]?.message}
            onValue={(value: string) => {
              handleSetForm("password", value);
            }}
          />
          <div className="text-right">
            <Link href={"/forget"} className="underline text-sm">
              Bạn quên mật khẩu?
            </Link>
          </div>
          <div>
            <Button
              theme="black"
              width="100%"
              onClick={() => {
                onSubmit(login);
              }}
            >
              Đăng Nhập
            </Button>
          </div>
          <div className="text-sm">
            Bạn chưa có tài khoản?
            <Link href={"/register"} className="underline ml-1">
              Đăng ký ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
