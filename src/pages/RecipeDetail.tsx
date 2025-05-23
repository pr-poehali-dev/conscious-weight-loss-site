
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, Share2, Clock, Flame, Printer, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import AIImageGenerator from "@/components/AIImageGenerator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Моковые данные для рецептов
const recipesData = [
  {
    id: "1",
    title: "Овощной смузи-боул",
    description: "Питательный и низкокалорийный завтрак",
    image: "/placeholder.svg",
    imagePrompt: "Здоровый завтрак, смузи-боул с фруктами и ягодами, фуд-фотография, яркие цвета",
    author: "Марина К.",
    calories: 250,
    time: "15 мин",
    portions: 1,
    category: "breakfast",
    ingredients: [
      "1 банан",
      "1 стакан шпината",
      "1/2 стакана замороженных ягод",
      "1/2 стакана греческого йогурта",
      "1 ст.л. семян чиа",
      "1 ст.л. меда (по желанию)"
    ],
    steps: [
      "Поместите банан, шпинат, замороженные ягоды и йогурт в блендер.",
      "Взбивайте до получения однородной массы.",
      "Перелейте смесь в глубокую тарелку.",
      "Посыпьте семенами чиа и полейте медом по желанию.",
      "Подавайте немедленно, украсив свежими ягодами или фруктами."
    ],
    nutritionalInfo: {
      protein: "12 г",
      fats: "5 г",
      carbs: "45 г",
      fiber: "7 г"
    },
    publishDate: "10 марта 2023",
    likes: 87,
    // Добавляем дополнительные фотографии для карусели
    additionalPhotos: [
      {
        prompt: "Яркий смузи-боул с ягодами и зеленью, крупный план, фуд-фотография",
        alt: "Крупный план смузи-боула с ягодами"
      },
      {
        prompt: "Процесс приготовления смузи-боула, ингредиенты разложены на столе, блендер",
        alt: "Процесс приготовления смузи-боула" 
      },
      {
        prompt: "Смузи-боул с бананом и киви, украшенный семенами чиа, вид сверху",
        alt: "Смузи-боул с бананом и киви"
      }
    ]
  },
  {
    id: "2",
    title: "Запеченная курица с травами",
    description: "Богатый белком и низкоуглеводный ужин",
    image: "/placeholder.svg",
    imagePrompt: "Запеченная куриная грудка с травами и лимоном, здоровая еда, фуд-фотография",
    author: "Алексей В.",
    calories: 320,
    time: "45 мин",
    portions: 4,
    category: "dinner",
    ingredients: [
      "4 куриные грудки",
      "2 ст.л. оливкового масла",
      "4 зубчика чеснока",
      "1 ст.л. свежего розмарина",
      "1 ст.л. свежего тимьяна",
      "1 лимон",
      "соль и перец по вкусу"
    ],
    steps: [
      "Разогрейте духовку до 200°C.",
      "Смешайте оливковое масло, измельченный чеснок и травы в миске.",
      "Натрите куриные грудки смесью масла и трав, приправьте солью и перцем.",
      "Выложите курицу на противень и сбрызните соком половины лимона.",
      "Запекайте в духовке 20-25 минут до готовности.",
      "Подавайте с дольками оставшегося лимона."
    ],
    nutritionalInfo: {
      protein: "35 г",
      fats: "12 г",
      carbs: "3 г",
      fiber: "1 г"
    },
    publishDate: "15 апреля 2023",
    likes: 124,
    additionalPhotos: []
  }
];

const RecipeDetail = () => {
  const { id } = useParams();
  const recipe = recipesData.find(r => r.id === id);

  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-8 container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Рецепт не найден</h1>
            <p className="mb-6">К сожалению, запрашиваемый рецепт не существует.</p>
            <Button asChild>
              <Link to="/recipes">Вернуться к рецептам</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <article className="container mx-auto px-4 max-w-4xl">
          <div className="mb-6">
            <Link to="/recipes" className="inline-flex items-center text-primary hover:underline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Вернуться к рецептам
            </Link>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{recipe.title}</h1>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-primary" />
              <span>Автор: {recipe.author}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-primary" />
              <span>{recipe.time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Flame className="w-4 h-4 text-primary" />
              <span>{recipe.calories} ккал</span>
            </div>
          </div>
          
          {/* Добавляем табы для основного фото и галереи */}
          <Tabs defaultValue="main" className="mb-8">
            <TabsList className="w-full justify-start mb-4">
              <TabsTrigger value="main">Основное фото</TabsTrigger>
              <TabsTrigger value="gallery">Галерея ({recipe.additionalPhotos.length + 1})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="main">
              <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden">
                <AIImageGenerator 
                  prompt={recipe.imagePrompt}
                  alt={recipe.title} 
                  className="w-full h-full"
                  fallbackSrc={recipe.image}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="gallery">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Основное фото в галерее */}
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <AIImageGenerator 
                    prompt={recipe.imagePrompt}
                    alt={recipe.title} 
                    className="w-full h-full"
                    fallbackSrc={recipe.image}
                  />
                </div>
                
                {/* Дополнительные фото */}
                {recipe.additionalPhotos.map((photo, index) => (
                  <div key={index} className="aspect-video bg-muted rounded-lg overflow-hidden">
                    <AIImageGenerator 
                      prompt={photo.prompt}
                      alt={photo.alt} 
                      className="w-full h-full"
                      fallbackSrc="/placeholder.svg"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="md:col-span-2">
              <h2 className="text-xl font-bold mb-4">Описание</h2>
              <p className="mb-6">{recipe.description}</p>
              
              <h2 className="text-xl font-bold mb-4">Приготовление</h2>
              <ol className="space-y-3 mb-6">
                {recipe.steps.map((step, index) => (
                  <li key={index} className="pl-6 relative">
                    <span className="absolute left-0 font-bold">{index + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            
            <div className="bg-muted/30 p-6 rounded-lg h-fit">
              <h2 className="text-xl font-bold mb-4">Ингредиенты</h2>
              <p className="text-sm text-muted-foreground mb-4">На {recipe.portions} {recipe.portions === 1 ? 'порцию' : 'порции'}</p>
              
              <ul className="space-y-2 mb-6">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="h-5 w-5 rounded border flex-shrink-0 mt-0.5"></div>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
              
              <h3 className="font-bold mb-2">Пищевая ценность (на порцию)</h3>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                <div>Белки: {recipe.nutritionalInfo.protein}</div>
                <div>Жиры: {recipe.nutritionalInfo.fats}</div>
                <div>Углеводы: {recipe.nutritionalInfo.carbs}</div>
                <div>Клетчатка: {recipe.nutritionalInfo.fiber}</div>
              </div>
            </div>
          </div>
          
          <Separator className="mb-6" />
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Heart className="w-4 h-4" />
                <span>{recipe.likes}</span>
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Поделиться
              </Button>
              <Button variant="outline" size="sm">
                <Printer className="w-4 h-4 mr-2" />
                Распечатать
              </Button>
            </div>
            <Button>Сохранить в избранное</Button>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default RecipeDetail;
