import Button from '@/components/Button';
import SpacingText from '@/components/SpacingText';
import React from 'react';

type Props = {};

export default function OrderDetail({}: Props) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-medium">Đơn hàng #123</h1>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <div className="bg-white rounded shadow-sm" style={{ minHeight: 180 * 3 }}></div>
        </div>
        <div className="col-span-4 flex flex-col gap-4">
          <div className="bg-white rounded shadow-sm p-4 flex flex-col gap-4">
            <p className="text-center font-medium">Thông tin thanh toán</p>
            <div className="flex flex-col gap-2">
              <SpacingText>
                <p>Giá trị đơn hàng:</p>
                <p className="font-medium">{1000000}đ</p>
              </SpacingText>
              <SpacingText>
                <p>Số lượng:</p>
                <p className="font-medium">{5}</p>
              </SpacingText>
              <SpacingText className="text-red-500">
                <p>Giảm giá:</p>
                <p className="font-medium">{100000}đ</p>
              </SpacingText>
              <SpacingText className="font-medium">
                <p className="font-medium">Thành tiền:</p>
                <p className="text-lg">{900000}đ</p>
              </SpacingText>
            </div>
          </div>
          <div className="bg-white rounded shadow-sm p-4 flex flex-col gap-4">
            <p className="text-center font-medium">Thông tin nhận hàng</p>
            <div className="flex flex-col gap-2">
              <SpacingText className="gap-4">
                <p>Họ Tên:</p>
                <p className="font-medium">Nguyễn Văn A</p>
              </SpacingText>
              <SpacingText className="gap-4">
                <p>SĐT người nhận:</p>
                <p className="font-medium">0860202020</p>
              </SpacingText>
              <div>
                <p className="whitespace-nowrap">Địa chỉ nhận hàng:</p>
                <p className="font-medium">356 Huỳnh Văn Bánh, Phú Nhuận, TPHCM</p>
              </div>
              <Button theme="black">Hủy Đơn Hàng</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
