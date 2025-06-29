import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Users, 
  MessageSquare, 
  Zap, 
  Shield, 
  Globe, 
  Smartphone,
  Code,
  BarChart3,
  TestTube,
  Server,
  Settings,
  Database,
  Calculator,
  Play,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const features = [
    {
      icon: TestTube,
      title: 'مختبر البرمجيات',
      description: 'خبير في تصميم حالات الاختبار وتحليل الأخطاء وعمليات ضمان الجودة',
      color: 'bg-emerald-500'
    },
    {
      icon: Code,
      title: 'مطور واجهات المستخدم',
      description: 'متخصص في تطوير واجهات المستخدم وتقنيات الفرونت إند الحديثة',
      color: 'bg-blue-500'
    },
    {
      icon: BarChart3,
      title: 'محلل الأعمال',
      description: 'خبير في تحليل متطلبات العمل وتصميم العمليات والحلول التقنية',
      color: 'bg-purple-500'
    },
    {
      icon: Server,
      title: 'مطور الخادم',
      description: 'متخصص في تطوير خوادم التطبيقات وقواعد البيانات والخدمات الخلفية',
      color: 'bg-green-600'
    },
    {
      icon: Smartphone,
      title: 'مطور التطبيقات المحمولة',
      description: 'خبير في تطوير تطبيقات الهواتف الذكية والأجهزة المحمولة',
      color: 'bg-orange-500'
    },
    {
      icon: Settings,
      title: 'مهندس DevOps',
      description: 'متخصص في نشر التطبيقات وإدارة البنية التحتية والأتمتة',
      color: 'bg-gray-600'
    },
    {
      icon: Database,
      title: 'مطور الويب المتكامل',
      description: 'مطور شامل متخصص في الفرونت إند والباك إند وقواعد البيانات',
      color: 'bg-indigo-600'
    },
    {
      icon: Users,
      title: 'مدير مشروع',
      description: 'خبير في إدارة المشاريع والتخطيط والمتابعة وتنسيق الفرق',
      color: 'bg-red-500'
    },
    {
      icon: Calculator,
      title: 'حساب تكاليف',
      description: 'متخصص في تحليل التكاليف وإعداد الميزانيات والتقارير المالية',
      color: 'bg-yellow-600'
    }
  ];

  const stats = [
    { number: '50K+', label: 'مستخدم نشط', icon: Users },
    { number: '1M+', label: 'محادثة مكتملة', icon: MessageSquare },
    { number: '99.9%', label: 'وقت التشغيل', icon: Zap },
    { number: '24/7', label: 'دعم متواصل', icon: Shield }
  ];

  const testimonials = [
    {
      name: 'أحمد محمد',
      role: 'مطور برمجيات',
      company: 'شركة التقنية المتقدمة',
      content: 'GPT Mate غيّر طريقة عملي تماماً. الآن أحصل على إجابات دقيقة ومفصلة لجميع استفساراتي التقنية في ثوانٍ معدودة.',
      rating: 5,
      avatar: 'أم'
    },
    {
      name: 'فاطمة علي',
      role: 'محللة أعمال',
      company: 'مؤسسة الابتكار الرقمي',
      content: 'أداة رائعة لتحليل متطلبات العمل وتصميم العمليات. ساعدتني في توفير ساعات من العمل وتحسين جودة التحليل.',
      rating: 5,
      avatar: 'فع'
    },
    {
      name: 'محمد حسن',
      role: 'مدير مشروع',
      company: 'شركة الحلول الذكية',
      content: 'منصة متكاملة تجمع كل ما أحتاجه لإدارة المشاريع التقنية. التكامل مع الأدوات الأخرى ممتاز والدعم استثنائي.',
      rating: 5,
      avatar: 'مح'
    }
  ];

  const pricingPlans = [
    {
      name: 'المجاني',
      price: '0',
      period: 'شهرياً',
      description: 'للمطورين الأفراد والاستخدام الشخصي',
      features: [
        '100 محادثة شهرياً',
        'الوصول لـ 3 أدوار',
        'دعم المجتمع',
        'التكامل الأساسي'
      ],
      popular: false,
      buttonText: 'ابدأ مجاناً'
    },
    {
      name: 'المحترف',
      price: '29',
      period: 'شهرياً',
      description: 'للفرق الصغيرة والمشاريع المتوسطة',
      features: [
        'محادثات غير محدودة',
        'جميع الأدوار (9 أدوار)',
        'التكامل المتقدم',
        'دعم أولوية',
        'تحليلات مفصلة',
        'نسخ احتياطية'
      ],
      popular: true,
      buttonText: 'اشترك الآن'
    },
    {
      name: 'المؤسسي',
      price: '99',
      period: 'شهرياً',
      description: 'للشركات الكبيرة والمؤسسات',
      features: [
        'كل مميزات المحترف',
        'إدارة الفرق المتقدمة',
        'تخصيص كامل',
        'دعم مخصص 24/7',
        'تدريب الفريق',
        'SLA مضمون'
      ],
      popular: false,
      buttonText: 'تواصل معنا'
    }
  ];

  const integrations = [
    { name: 'Jira', logo: '🔧', description: 'إدارة المشاريع' },
    { name: 'ClickUp', logo: '✅', description: 'إدارة المهام' },
    { name: 'Azure DevOps', logo: '☁️', description: 'التطوير السحابي' },
    { name: 'Axure', logo: '🎨', description: 'تصميم النماذج' },
    { name: 'GitHub', logo: '🐙', description: 'إدارة الكود' },
    { name: 'Slack', logo: '💬', description: 'التواصل' }
  ];

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">GM</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">GPT Mate</h1>
                <p className="text-xs text-gray-500">مساعدك الذكي للتطوير</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8 space-x-reverse">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">المميزات</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">الأسعار</a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors">آراء العملاء</a>
              <a href="#integrations" className="text-gray-700 hover:text-blue-600 transition-colors">التكاملات</a>
              <Button 
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                تجربة مجانية
                <ArrowRight className="w-4 h-4 mr-2" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">المميزات</a>
                <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors">الأسعار</a>
                <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors">آراء العملاء</a>
                <a href="#integrations" className="text-gray-700 hover:text-blue-600 transition-colors">التكاملات</a>
                <Button 
                  onClick={() => navigate('/')}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 w-full"
                >
                  تجربة مجانية
                  <ArrowRight className="w-4 h-4 mr-2" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                  🚀 الآن متاح للجميع
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  مساعدك الذكي في
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> التطوير البرمجي</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  منصة متكاملة تجمع 9 خبراء ذكاء اصطناعي متخصصين في مختلف مجالات التطوير البرمجي. 
                  من الاختبار إلى التطوير، ومن تحليل الأعمال إلى إدارة المشاريع.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  onClick={() => navigate('/')}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg px-8 py-4"
                >
                  ابدأ التجربة المجانية
                  <ArrowRight className="w-5 h-5 mr-2" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-4 border-2"
                >
                  <Play className="w-5 h-5 ml-2" />
                  شاهد العرض التوضيحي
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="flex justify-center mb-2">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hero Image/Demo */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
                <div className="flex items-center space-x-3 space-x-reverse mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="flex-1 bg-gray-100 rounded-lg px-4 py-2 text-center text-sm text-gray-600">
                    gptmate.ai
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4 border-r-4 border-blue-500">
                    <p className="text-sm text-gray-700">
                      <strong>أنت:</strong> كيف أختبر واجهة تسجيل الدخول في تطبيق React؟
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 border-r-4 border-emerald-500">
                    <div className="flex items-center space-x-2 space-x-reverse mb-2">
                      <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                        <TestTube className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm font-medium text-emerald-700">مختبر البرمجيات</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      سأساعدك في إنشاء خطة اختبار شاملة لواجهة تسجيل الدخول. إليك الخطوات:
                    </p>
                    <ul className="text-xs text-gray-600 mt-2 space-y-1">
                      <li>• اختبار الحقول المطلوبة</li>
                      <li>• اختبار التحقق من صحة البيانات</li>
                      <li>• اختبار حالات الخطأ...</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-20 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              9 خبراء ذكاء اصطناعي في خدمتك
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              فريق متكامل من المتخصصين الأذكياء جاهز لمساعدتك في جميع مراحل التطوير البرمجي
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 space-x-reverse">
                      <div className={`p-3 rounded-xl ${feature.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section id="integrations" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              يتكامل مع أدواتك المفضلة
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              اربط GPT Mate مع الأدوات التي تستخدمها يومياً لتجربة عمل سلسة ومتكاملة
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {integrations.map((integration, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {integration.logo}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{integration.name}</h3>
                  <p className="text-xs text-gray-600">{integration.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              ماذا يقول عملاؤنا
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              آلاف المطورين والمؤسسات يثقون في GPT Mate لتطوير مشاريعهم
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-1 space-x-reverse mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                  
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-blue-600 text-white">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <p className="text-xs text-gray-500">{testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              خطط تناسب جميع الاحتياجات
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              اختر الخطة المناسبة لك ولفريقك، مع إمكانية الترقية أو التراجع في أي وقت
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative hover:shadow-xl transition-all duration-300 ${plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">الأكثر شعبية</Badge>
                  </div>
                )}
                
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    <div className="flex items-baseline justify-center space-x-1 space-x-reverse">
                      <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                      <span className="text-gray-600">/{plan.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3 space-x-reverse">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-900 hover:bg-gray-800'}`}
                    onClick={() => navigate('/')}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              جاهز لتحويل طريقة تطويرك؟
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              انضم إلى آلاف المطورين الذين يستخدمون GPT Mate لتسريع مشاريعهم وتحسين جودة الكود
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate('/')}
                className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4"
              >
                ابدأ التجربة المجانية الآن
                <ArrowRight className="w-5 h-5 mr-2" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4"
              >
                تحدث مع فريق المبيعات
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 space-x-reverse">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">GM</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">GPT Mate</h3>
                  <p className="text-sm text-gray-400">مساعدك الذكي للتطوير</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                منصة متكاملة تجمع خبراء الذكاء الاصطناعي المتخصصين في مختلف مجالات التطوير البرمجي.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold mb-4">المنتج</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">المميزات</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">الأسعار</a></li>
                <li><a href="#integrations" className="hover:text-white transition-colors">التكاملات</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-4">الدعم</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">مركز المساعدة</a></li>
                <li><a href="#" className="hover:text-white transition-colors">الوثائق</a></li>
                <li><a href="#" className="hover:text-white transition-colors">تواصل معنا</a></li>
                <li><a href="#" className="hover:text-white transition-colors">حالة النظام</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4">الشركة</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">من نحن</a></li>
                <li><a href="#" className="hover:text-white transition-colors">المدونة</a></li>
                <li><a href="#" className="hover:text-white transition-colors">الوظائف</a></li>
                <li><a href="#" className="hover:text-white transition-colors">الخصوصية</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 GPT Mate. جميع الحقوق محفوظة.
            </p>
            <div className="flex items-center space-x-6 space-x-reverse mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Globe className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <MessageSquare className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Users className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;