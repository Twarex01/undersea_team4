using System;
using System.Collections.Generic;
using System.Text;

namespace StrategyGame.Model
{
    public class ResourceData
    {
        public static ResourceData Coral = new ResourceData{ ID = 1, Name ="Korall" };
        public static ResourceData Pearl = new ResourceData { ID = 2, Name = "Gyöngy" };
        public static int TaxAmount = 25; // azért csak egy szám mert a játék működése szempontjából nem lenne értelmes a gyöngytől különböző erőforrást adózni

        public int ID { get; set; }
        public string Name { get; set; }
    }
}
