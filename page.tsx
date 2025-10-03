
'use client';

import Navigation from '@/components/Navigation';
import BottomTabBar from '@/components/BottomTabBar';
import Link from 'next/link';

export default function Home() {
  const features = [
    {
      title: 'ระบบ POS',
      icon: 'ri-store-line',
      description: 'ระบบขายหน้าร้าน รองรับบาร์โค้ด QR Payment',
      color: 'from-blue-500 to-cyan-500',
      href: '/pos'
    },
    {
      title: 'จัดการสต๊อก',
      icon: 'ri-archive-line',
      description: 'นำเข้า-ส่งออก แจ้งเตือนสินค้าใกล้หมด',
      color: 'from-green-500 to-emerald-500',
      href: '/pos/inventory'
    },
    {
      title: 'ลูกค้า & สมาชิก',
      icon: 'ri-user-line',
      description: 'ระบบแต้มสะสม โปรโมชั่นพิเศษ',
      color: 'from-purple-500 to-pink-500',
      href: '/pos/customers'
    },
    {
      title: 'ระบบชำระเงิน',
      icon: 'ri-bank-card-line',
      description: 'Cash, QR, EDC, E-Wallet ครบครัน',
      color: 'from-orange-500 to-red-500',
      href: '/pos/payment'
    },
    {
      title: 'รายงานการขาย',
      icon: 'ri-bar-chart-line',
      description: 'รายงานยอดขาย กำไร วิเคราะห์ทุกมิติ',
      color: 'from-indigo-500 to-blue-500',
      href: '/pos/reports'
    },
    {
      title: 'ตลาดซื้อขาย',
      icon: 'ri-shopping-bag-line',
      description: 'ซื้อขายสินค้าออนไลน์ บริการเสริม',
      color: 'from-yellow-500 to-orange-500',
      href: '/marketplace'
    }
  ];

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 pb-24">
        <div className="max-w-sm mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="relative w-full h-48 mb-6 rounded-2xl overflow-hidden">
              <img
                src="https://readdy.ai/api/search-image?query=modern%20POS%20system%20interface%20with%20cash%20register%2C%20payment%20terminal%2C%20barcode%20scanner%2C%20receipt%20printer%2C%20retail%20technology%2C%20professional%20business%20environment%2C%20clean%20modern%20design%2C%20blue%20and%20white%20color%20scheme&width=350&height=200&seq=pos-hero-main&orientation=landscape"
                alt="POS System"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              ระบบ POS ครบวงจร
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              ระบบขายหน้าร้าน จัดการสต๊อก ลูกค้า และรายงาน
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                href={feature.href}
                className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-3`}>
                  <i className={`${feature.icon} text-white text-lg`}></i>
                </div>
                <h3 className="font-semibold text-gray-800 text-sm mb-1">
                  {feature.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {feature.description}
                </p>
              </Link>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4">สถิติวันนี้</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">156</div>
                <div className="text-xs text-gray-500">ออร์เดอร์</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">฿45,600</div>
                <div className="text-xs text-gray-500">ยอดขาย</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">฿18,240</div>
                <div className="text-xs text-gray-500">กำไร</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BottomTabBar />
    </>
  );
}
