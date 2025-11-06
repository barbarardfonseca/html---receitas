export default class Recipe {
  id?: string;

  name: string;

  isFavorite: boolean;

  description: string;

  ingredients: string;

  instructions: string;

  imageUrl: string;

  cookingTime: number;

  servings: number;

  category: string;

  authorId: string;

  createdAt: Date | unknown;

  updatedAt: Date | unknown | null;

  constructor(props?: RecipeProps) {
    this.id = props?.id;
    this.name = props?.name ?? "";
    this.description = props?.description ?? "";
    this.ingredients = props?.ingredients ?? "";
    this.instructions = props?.instructions ?? "";
    this.imageUrl = props?.imageUrl ?? "";
    this.cookingTime = props?.cookingTime ?? 0;
    this.servings = props?.servings ?? 1;
    this.category = props?.category ?? "";
    this.authorId = props?.authorId ?? "";
    this.createdAt = props?.createdAt || new Date();
    this.updatedAt = props?.updatedAt || null;
    this.isFavorite = false;
  }

  static create(props: RecipeProps): Recipe {
    return new Recipe(props);
  }

  toJson(): RecipeProps {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      ingredients: this.ingredients,
      instructions: this.instructions,
      imageUrl: this.imageUrl,
      cookingTime: this.cookingTime,
      servings: this.servings,
      category: this.category,
      authorId: this.authorId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      isFavorite: this.isFavorite,
    };
  }

  toJsonWithoutId(): RecipeProps {
    const json = this.toJson();

    delete json.id;

    return json;
  }
}

export type RecipeProps = {
  id?: string;
  name: string;
  description: string;
  ingredients: string;
  instructions: string;
  imageUrl: string;
  cookingTime: number;
  servings: number;
  category: string;
  authorId: string;
  createdAt?: Date | unknown;
  updatedAt?: Date | unknown;
  isFavorite: boolean;
};