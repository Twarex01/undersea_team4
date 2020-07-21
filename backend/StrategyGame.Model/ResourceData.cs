namespace StrategyGame.Model
{
	public class ResourceData
	{
		public static ResourceData Coral = new ResourceData
		{
			ID = 1,
			Name = "Korall",
			ImageURL = "Assets/Resources/coral.png"
		};
		public static ResourceData Pearl = new ResourceData
		{
			ID = 2,
			Name = "Gyöngy",
			ImageURL = "Assets/Resources/pearl.png"
		};
		public static ResourceData Stone = new ResourceData
		{
			ID = 3, Name = "Kő",
			ImageURL = "Assets/Resources/stone.svg"
		};

		public static int TaxAmount = 25; // azért csak egy szám mert a játék működése szempontjából nem lenne értelmes a gyöngytől különböző erőforrást adózni
		public static int BasePopulation = 10;
		public static int BaseCoralProduction = 20;

		public int ID { get; set; }
		public string Name { get; set; }
		public string ImageURL { get; set; }
	}
}
