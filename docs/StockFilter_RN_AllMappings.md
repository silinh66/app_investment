# Full onFilter mapping (extracted from web)

This file enumerates all 223 criteria. For each item we show where its value is written (faKeys, fAFilterSub, parameters, booleanFilter), the control type to use in RN (range/select), whether timeframe is involved, and raw code snippet for reference.

## Biến động giá 1 ngày

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
parameters.push({
            name: "Biến động giá 1 ngày",
            code: "PercentPriceChange1Day",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
```

## Biến động giá 1 tuần

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
parameters.push({
            name: "Biến động giá 1 tuần",
            code: "PercentPriceChange1Week",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
```

## Biến động giá 1 tháng

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
parameters.push({
            name: "Biến động giá 1 tháng",
            code: "PercentPriceChange1Month",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
```

## Biến động giá 3 tháng

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
parameters.push({
            name: "Biến động giá 3 tháng",
            code: "PercentPriceChange3Month",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
```

## Biến động giá 6 tháng

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0, 6
```ts
parameters.push({
            name: "Biến động giá 6 tháng",
            code: "PercentPriceChange6Month",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
```

## Biến động giá 52 tuần

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0, 52
```ts
parameters.push({
            name: "Biến động giá 52 tuần",
            code: "PercentPriceChange52Week",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
```

## Biến động giá từ đầu năm

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
parameters.push({
            name: "Biến động giá từ đầu năm",
            code: "PercentPriceChangeYTD",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
```

## Khối lượng GD

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
```ts
parameters.push({
            name: "Khối lượng GD",
            code: "TotalMatchVolum",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "ThousandUnit",
          });
          break;
```

## Kl T.bình 5 phiên

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
```ts
parameters.push({
            name: "Kl T.bình 5 phiên",
            code: "AverageVolume1Week",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "ThousandUnit",
          });
          break;
```

## Kl T.bình 10 phiên

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 10
```ts
parameters.push({
            name: "Kl T.bình 10 phiên",
            code: "AverageVolume2Week",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "ThousandUnit",
          });
          break;
```

## Kl T.bình 20 phiên

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 20
```ts
parameters.push({
            name: "Kl T.bình 20 phiên",
            code: "AverageVolume1Month",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "ThousandUnit",
          });
          break;
```

## Kl T.bình 3 tháng

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
```ts
parameters.push({
            name: "Kl T.bình 3 tháng",
            code: "AverageVolume3Month",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "ThousandUnit",
          });
          break;
```

## % Free Float

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
parameters.push({
            name: "% Free Float",
            code: "FreeFloatRate",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0] / 100),
              ConvertStringToNumber(tieuChi.rightIndexValue[1] / 100),
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "ThousandUnit",
          });
          break;
```

## Giá trị GD

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
parameters.push({
            name: "Giá trị GD",
            code: "TotalMatchValue",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0] * 1000000),
              ConvertStringToNumber(tieuChi.rightIndexValue[1] * 1000000),
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "MillionVND",
          });
          break;
```

## Giá trị GD T.bình 5D

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
parameters.push({
            name: "Giá trị GD T.bình 5D",
            code: "AverageValue1Week",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0] * 1000000),
              ConvertStringToNumber(tieuChi.rightIndexValue[1] * 1000000),
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "MillionVND",
          });
          break;
```

## Giá trị GD T.bình 10D

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0, 10
```ts
parameters.push({
            name: "Giá trị GD T.bình 10D",
            code: "AverageValue2Week",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0] * 1000000),
              ConvertStringToNumber(tieuChi.rightIndexValue[1] * 1000000),
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "MillionVND",
          });
          break;
```

## Giá trị GD T.bình 20D

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0, 20
```ts
parameters.push({
            name: "Giá trị GD T.bình 20D",
            code: "AverageValue2Week",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0] * 1000000),
              ConvertStringToNumber(tieuChi.rightIndexValue[1] * 1000000),
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "MillionVND",
          });
          break;
```

## Giá trị GD T.bình 3M

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
parameters.push({
            name: "Giá trị GD T.bình 3M",
            code: "AverageValue3Month",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0] * 1000000),
              ConvertStringToNumber(tieuChi.rightIndexValue[1] * 1000000),
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "MillionVND",
          });
          break;
```

## Vốn hóa

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
parameters.push({
            name: "Vốn hóa",
            code: "Rtd11",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0] * 1000000000),
              ConvertStringToNumber(tieuChi.rightIndexValue[1] * 1000000000),
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "BillionVND",
          });
          break;
```

## Giá

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
parameters.push({
            name: "Giá",
            code: "ClosePrice",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) * 1000000000,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) * 1000000000,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "BillionVND",
          });
          break;
```

## P/E - fin (TTM)

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
```ts
parameters.push({
            name: "P/E (TTM)",
            code: "Rtd21",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
```

## P/S - fin (TTM)

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
```ts
parameters.push({
            name: "P/S (TTM)",
            code: "Rtd26",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
```

## P/B (TTM)

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
```ts
parameters.push({
            name: "P/B (TTM)",
            code: "Rtd25",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
```

## Giá - Dòng Tiền (TTM)

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
```ts
parameters.push({
            name: "Giá - Dòng Tiền (TTM)",
            code: "Rtd28",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
```

## Giá - Dòng Tiền Tự Do (TTM)

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 40
```ts
parameters.push({
            name: "Giá - Dòng Tiền Tự Do (TTM)",
            code: "Rtd40",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
```

## Giá - T.sản hữu hình (TTM)

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
```ts
parameters.push({
            name: "Giá - T.sản hữu hình (TTM)",
            code: "Rtd27",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
```

## EPS - fin (TTM)

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 14
```ts
parameters.push({
            name: "EPS (TTM)",
            code: "Rtd14",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
```

## Doanh thu (tỉ đồng) (TTM)

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
parameters.push({
            name: "Doanh thu (tỉ đồng) (TTM)",
            code: "RevTTM",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) * 1000000000,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) * 1000000000,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "BillionVND",
          });
          break;
```

## LN ròng (tỉ đồng) (TTM)

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0, 20
```ts
parameters.push({
            name: "LN ròng (tỉ đồng) (TTM)",
            code: "Isa20TTM",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) * 1000000000,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) * 1000000000,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "BillionVND",
          });
          break;
```

## Doanh thu (tỉ đồng) (năm trước)

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
parameters.push({
            name: "Doanh thu (tỉ đồng) (năm trước)",
            code: "RevY",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) * 1000000000,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) * 1000000000,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "BillionVND",
          });
          break;
```

## LN ròng (tỉ đồng) (năm trước)

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0, 20
```ts
parameters.push({
            name: "LN ròng (tỉ đồng) (năm trước)",
            code: "Isa20Y",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) * 1000000000,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) * 1000000000,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "BillionVND",
          });
          break;
```

## Doanh thu (quý gần nhất)

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
parameters.push({
            name: "Doanh thu (quý gần nhất)",
            code: "Rev",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) * 1000000000,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) * 1000000000,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "BillionVND",
          });
          break;
```

## Lợi nhuận thuần (quý gần nhất)

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
parameters.push({
            name: "Lợi nhuận thuần (quý gần nhất)",
            code: "Prf",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) * 1000000000,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) * 1000000000,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "BillionVND",
          });
          break;
```

## T.trưởng D.thu (YoY)

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
parameters.push({
            name: "T.trưởng D.thu (YoY)",
            code: "Rtq78",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
```

## T.trưởng LN gộp (YoY)

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
parameters.push({
            name: "T.trưởng LN gộp (YoY)",
            code: "Rtq79",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
```

## T.trưởng LN ròng (YoY)

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
parameters.push({
            name: "T.trưởng LN ròng (YoY)",
            code: "Rtq83",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
```

## T.trưởng K.doanh 3 năm

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
parameters.push({
            name: "T.trưởng K.doanh 3 năm",
            code: "Ryq160",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
```

## T.trưởng LN ròng 3 năm

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
parameters.push({
            name: "T.trưởng LN ròng 3 năm",
            code: "Ryq166",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
```

## T.trưởng vốn CSH 3 năm

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
parameters.push({
            name: "T.trưởng vốn CSH 3 năm",
            code: "Ryq176",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
```

## T.trưởng EPS (TTM)

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0, 52
```ts
parameters.push({
            name: "T.trưởng EPS (TTM)",
            code: "Rtd52",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
```

## Tăng trưởng doanh thu quý gần nhất (YoY)

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
parameters.push({
            name: "Tăng trưởng doanh thu quý gần nhất (YoY)",
            code: "RevGrowth",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
```

## Tăng trưởng lợi nhuận thuần quý gần nhất (YoY)

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
parameters.push({
            name: "Tăng trưởng lợi nhuận thuần quý gần nhất (YoY)",
            code: "PrfGrowth",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
```

## ROE (TTM)

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
parameters.push({
            name: "ROE (TTM)",
            code: "Rtq12",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
```

## ROA (TTM)

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0, 14
```ts
parameters.push({
            name: "ROA (TTM)",
            code: "Rtq14",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
```

## Biên LN gộp (TTM)

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
parameters.push({
            name: "Biên LN gộp (TTM)",
            code: "Rtq25",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
```

## Biên LN gộp (quý)

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
parameters.push({
            name: "Biên LN gộp (quý)",
            code: "Rqq25",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
```

## Biên LN gộp (năm gần nhất)

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
parameters.push({
            name: "Biên LN gộp (năm gần nhất)",
            code: "Ryq25",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
```

## Biên LN ròng (TTM)

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
parameters.push({
            name: "Biên LN ròng (TTM)",
            code: "Rtq29",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
```

## Biên LN ròng (quý)

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
parameters.push({
            name: "Biên LN ròng (quý)",
            code: "Rqq29",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
```

## Biên LN ròng (năm gần nhất)

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
parameters.push({
            name: "Biên LN ròng (năm gần nhất)",
            code: "Ryq29",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
```

## Biên EBIT (TTM)

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
parameters.push({
            name: "Biên EBIT (TTM)",
            code: "Rtq27",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
```

## Biên EBIT (quý)

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
parameters.push({
            name: "Biên EBIT (quý)",
            code: "Rqq27",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
```

## ROIC (quý)

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
parameters.push({
            name: "ROIC (quý)",
            code: "Rqq23",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
```

## Nợ phải trả/ Tổng tài sản (TTM)

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
```ts
parameters.push({
            name: "Nợ phải trả/ Tổng tài sản (TTM)",
            code: "Rtq7",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
```

## Nợ phải trả/ Vốn chủ sở hữu (TTM)

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 6
```ts
parameters.push({
            name: "Nợ phải trả/ Vốn chủ sở hữu (TTM)",
            code: "Rtq6",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
```

## Nợ dài hạn/ Vốn chủ sở hữu (TTM)

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
```ts
parameters.push({
            name: "Nợ dài hạn/ Vốn chủ sở hữu (TTM)",
            code: "Rtq4",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
```

## Nợ phải trả/ Vốn chủ sở hữu (quý)

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 6
```ts
parameters.push({
            name: "Nợ phải trả/ Vốn chủ sở hữu (quý)",
            code: "Rqq6",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
```

## Tỉ suất thanh toán hiện hành (TTM)

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
```ts
parameters.push({
            name: "Tỉ suất thanh toán hiện hành (TTM)",
            code: "Rtq3",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
```

## Tỉ suất thanh toán nhanh (TTM)

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
```ts
parameters.push({
            name: "Tỉ suất thanh toán nhanh (TTM)",
            code: "Rtq2",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
```

## Tỉ suất thanh toán tiền mặt (TTM)

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
```ts
parameters.push({
            name: "Tỉ suất thanh toán tiền mặt (TTM)",
            code: "Rtq1",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
```

## Khả năng chi trả lãi vay (TTM)

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
```ts
parameters.push({
            name: "Khả năng chi trả lãi vay (TTM)",
            code: "Rtq77",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
```

## Tỉ lệ tổ chức sở hữu

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
parameters.push({
            name: "Tỉ lệ tổ chức sở hữu",
            code: "CorpOwnership",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
```

## Sở hữu nước ngoài

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
parameters.push({
            name: "Sở hữu nước ngoài",
            code: "ForeignerPercentage",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
```

## Room nước ngoài

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
parameters.push({
            name: "Room nước ngoài",
            code: "ForeignerRoom",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
```

## Cổ Tức

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
```ts
parameters.push({
            name: "Cổ Tức",
            code: "Rtd43",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
```

## Tỉ Suất Cổ Tức

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0, 20
```ts
parameters.push({
            name: "Tỉ Suất Cổ Tức",
            code: "Rtd20",
            type: "Range",
            sselectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
```

## Tỉ Suất Cổ Tức T.Bình 3 Năm

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0, 20
```ts
parameters.push({
            name: "Tỉ Suất Cổ Tức T.Bình 3 Năm",
            code: "Rtd20Avg",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
```

## Tỉ Lệ Chi Trả Cổ Tức

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
parameters.push({
            name: "Tỉ Lệ Chi Trả Cổ Tức",
            code: "Rtd51",
            type: "Range",
            selectedValue: [
              ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100,
              ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100,
            ],
            valueRange: tieuChi.rightIndexList,
            unit: "Percentage",
          });
          break;
```

## RSI

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
```ts
parameters.push({
            name: "RSI",
            code: "Rsi",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
```

## ADX

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
```ts
parameters.push({
            name: "ADX",
            code: "Rsi",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
```

## CCI

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
```ts
parameters.push({
            name: "CCI",
            code: "Cci",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
```

## ROC

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
```ts
parameters.push({
            name: "ROC",
            code: "Roc",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
```

## STOCH

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
```ts
parameters.push({
            name: "STOCH",
            code: "Stochastic",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
```

## Williams

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
```ts
parameters.push({
            name: "Williams",
            code: "Williams",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
```

## MFI

- **Destination:** parameters
- **Control guess:** range
- **Has timeframe:** no
```ts
parameters.push({
            name: "MFI",
            code: "Mfi",
            type: "Range",
            selectedValue: ConvertStringToNumber(tieuChi.rightIndexValue),
            valueRange: tieuChi.rightIndexList,
            unit: "Unit",
          });
          break;
```

## Giá trị giao dịch ròng của NĐTNN

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0, 10, 20, 60, =
```ts
let curSession = 0;
          switch (tieuChi.session) {
            case 0:
              curSession = 5;
              break;
            case 1:
              curSession = 10;
              break;
            case 2:
              curSession = 20;
              break;
            case 3:
              curSession = 60;
              break;
            case 4:
              curSession = 120;
              break;

            default:
              break;
          }

          fAFilterSub.push({
            key: `ForeignBuySellValue_${curSession}`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## Biên độ giá đóng cửa theo số phiên (%)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0, 10, 20, 60, =
```ts
let curSession1 = 0;
          switch (tieuChi.session) {
            case 0:
              curSession1 = 5;
              break;
            case 1:
              curSession1 = 10;
              break;
            case 2:
              curSession1 = 20;
              break;
            case 3:
              curSession1 = 60;
              break;
            case 4:
              curSession1 = 120;
              break;

            default:
              break;
          }
          fAFilterSub.push({
            key: `BienDoGia_${curSession1}`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## Biên độ giá High - Low theo số phiên (%)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0, 10, 20, 60, =
```ts
let curSession2 = 0;
          switch (tieuChi.session) {
            case 0:
              curSession2 = 5;
              break;
            case 1:
              curSession2 = 10;
              break;
            case 2:
              curSession2 = 20;
              break;
            case 3:
              curSession2 = 60;
              break;
            case 4:
              curSession2 = 120;
              break;

            default:
              break;
          }
          fAFilterSub.push({
            key: `BienDoGiaHighLow_${curSession2}`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## P/E (TTM)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `PE`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## EPS (TTM)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `Eps_TTM`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## Vốn hoá

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `MarketCap`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## Fscore

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `Fscore`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## Mscore

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `Mscore`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## Zscore

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `Zscore`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## Tỷ suất cổ tức năm gần nhất

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `DividendYield_LastYear`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
```

## KLTB 3 tháng

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `AvgVol3M`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## RS1m (1 tháng)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `RS1M`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## RS3m (3 tháng)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `RS3M`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## RS6m (6 tháng)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0, 6
```ts
faFilter.push({
            key: `RS6M`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## RS52w (52 tuần)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0, 52
```ts
faFilter.push({
            key: `RS52W`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## Khối lượng

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `TotalDealVol`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## Giá trị giao dịch

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `TotalDealValue`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## Khối lượng Trung bình theo số phiên

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0, 10, 20, 60, =
```ts
let curSession3 = 0;
          switch (tieuChi.session) {
            case 0:
              curSession3 = 5;
              break;
            case 1:
              curSession3 = 10;
              break;
            case 2:
              curSession3 = 20;
              break;
            case 3:
              curSession3 = 60;
              break;
            case 4:
              curSession3 = 120;
              break;

            default:
              break;
          }
          fAFilterSub.push({
            key: `TotalVolumeAvg_${curSession3}`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## Giá trị giao dịch Trung bình theo phiên

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0, 10, 20, 60, =
```ts
let curSession4 = 0;
          switch (tieuChi.session) {
            case 0:
              curSession4 = 5;
              break;
            case 1:
              curSession4 = 10;
              break;
            case 2:
              curSession4 = 20;
              break;
            case 3:
              curSession4 = 60;
              break;
            case 4:
              curSession4 = 120;
              break;

            default:
              break;
          }
          fAFilterSub.push({
            key: `TotalDealValueAvg_${curSession4}`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## Lợi nhuận chuyển từ lỗ sang lãi (Tính theo kỳ báo cáo liên tục)

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0, =
```ts
let key = "";
          switch (tieuChi.month) {
            case 0:
              key = "Profit_MRQ_FH";
              break;
            case 1:
              key = "Profit_MRQ_2_FH";
              break;
            case 2:
              key = "Profit_TTM_FH";
              break;
            case 3:
              key = "Profit_MRY_FH";
              break;

            default:
              break;
          }
          faKeys.push(key);
          break;
```

## EPS chuyển từ âm sang dương (Tính theo kỳ báo cáo liên tục)

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0, =
```ts
let key1 = "";
          switch (tieuChi.month) {
            case 0:
              key1 = "Eps_MRQ_FH";
              break;
            case 1:
              key1 = "Eps_MRQ_2_FH";
              break;
            case 2:
              key1 = "Eps_TTM_FH";
              break;
            case 3:
              key1 = "Eps_MRY_FH";
              break;

            default:
              break;
          }
          faKeys.push(key1);
          break;
```

## Tăng trưởng doanh thu Quý gần nhất (%)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `NetSale_Growth_MRQ`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
```

## Tăng trưởng doanh thu Quý gần nhì (%)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `NetSale_Growth_MRQ_2`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
```

## Tăng trưởng doanh thu 4 Quý gần nhất (%)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `NetSale_Growth_TTM`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
```

## Tăng trưởng doanh thu Năm gần nhất (%)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `NetSale_Growth_MRY`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
```

## Tăng trưởng doanh thu Bình quân 3 năm (%)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `NetSale_Growth_Avg_3Y`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
```

## Tăng trưởng doanh thu Bình quân 3 năm (% - TTM)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `NetSale_Growth_TTM_Avg_3Y`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
```

## Tăng trưởng lợi nhuận Quý gần nhất (%)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `Profit_Growth_MRQ`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
```

## Tăng trưởng lợi nhuận Quý gần nhì (%)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `Profit_Growth_MRQ_2`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
```

## Tăng trưởng LN 4 Quý gần nhất (%)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `Profit_Growth_TTM`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
```

## Tăng trưởng LN Năm gần nhất (%)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `Profit_Growth_MRY`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
```

## Tăng trưởng LN Bình quân 3 năm (%)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `Profit_Growth_Avg_3Y`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
```

## Tăng trưởng LN Bình quân 3 năm (% - TTM)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `Profit_Growth_TTM_Avg_3Y`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
```

## Tăng trưởng EPS Quý gần nhất (%)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `Eps_Growth_MRQ`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
```

## Tăng trưởng EPS Quý gần nhì (%)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `Eps_Growth_MRQ_2`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
```

## Tăng trưởng EPS 4 Quý gần nhất (%)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `Eps_Growth_TTM`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
```

## Tăng trưởng EPS Năm gần nhất (%)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `Eps_Growth_MRY`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
```

## Tăng trưởng EPS Bình quân 3 năm (%)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `Eps_Growth_Avg_3Y`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
```

## Tăng trưởng EPS Bình quân 3 năm (% - TTM)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `Eps_Growth_TTM_Avg_3Y`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
```

## P/S (TTM)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `PS`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## P/B (MRQ)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `PB`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## Vòng quay tổng tài sản (TTM)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `ME_AssetTurnover`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## Vòng quay hàng tồn kho (TTM)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `ME_InventoryTurnover`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## Vòng quay các khoản phải thu (TTM)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `ME_ReceivableTurnover`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## ROE (%)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `ME_ROE`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
```

## ROA (%)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `ME_ROA`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
```

## Giá cuối

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `LastPrice`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## Cao nhất 52 tuần

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0, 52
```ts
faFilter.push({
            key: `AdjHigh52W`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## Thấp nhất 52 tuần

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0, 52
```ts
faFilter.push({
            key: `AdjLow52W`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## Thay đổi trong 52 tuần

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0, 52
```ts
faFilter.push({
            key: `Change52W`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## % thay đổi 1 tháng

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `ChangePercent1M`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
```

## % Thay đổi từ đầu năm

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `ChangePercentYTD`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
```

## % Thay đổi từ đáy 52 tuần

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0, 52
```ts
faFilter.push({
            key: `AdjLow52W_PercentChange`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
```

## % Thay đổi từ đỉnh 52 tuần

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0, 52
```ts
faFilter.push({
            key: `AdjHigh52W_PercentChange`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
```

## % thay đổi giá đóng cửa theo số phiên

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0, 10, 20, 60, =
```ts
let curSession5 = 0;
          switch (tieuChi.session) {
            case 0:
              curSession5 = 5;
              break;
            case 1:
              curSession5 = 10;
              break;
            case 2:
              curSession5 = 20;
              break;
            case 3:
              curSession5 = 60;
              break;
            case 4:
              curSession5 = 120;
              break;

            default:
              break;
          }
          fAFilterSub.push({
            key: `ChangePercent_${curSession5}`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## Biến động trong ngày (%)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `PriceChangePercent`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;

        // case 'Giá trị giao dịch':
        //   faFilter.push({
        //     key: `TotalDealValue`,
        //     value: {
        //       min: tieuChi.rightIndexValue[0].toString(),
        //       max: tieuChi.rightIndexValue[1].toString(),
        //     },
        //   });
        //   break;
```

## Beta

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `Beta`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## Vượt đỉnh 1 tuần

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, =, Daily, VUOT, Weekly
```ts
let price = "";
          let day = "";

          switch (tieuChi.leftIndexValue) {
            case 0:
              price = "Giá (Close)";
              break;
            case 1:
              price = "Giá (Low)";
              break;
            case 2:
              price = "Giá (Average)";
              break;
            case 3:
              price = "Average (H,L,C)";
              break;

            default:
              break;
          }
          switch (tieuChi.interval) {
            case 0:
              day = "1 ngày";
              break;
            case 1:
              day = "1 tuần";
              break;

            default:
              break;
          }
          if (price === "Giá (Close)" && day === "1 ngày") {
            faKeys.push("Close_VUOT_Top1W_Daily");
          } else if (price === "Giá (Close)" && day === "1 tuần") {
            faKeys.push("Close_VUOT_Top1W_Weekly");
          } else if (price === "Giá (High)" && day === "1 ngày") {
            faKeys.push("High_VUOT_Top1W_Daily");
          } else if (price === "Giá (High)" && day === "1 tuần") {
            faKeys.push("High_VUOT_Top1W_Weekly");
          } else if (price === "Giá (Low)" && day === "1 ngày") {
            faKeys.push("Low_VUOT_Top1W_Daily");
          } else if (price === "Giá (Low)" && day === "1 tuần") {
            faKeys.push("Low_VUOT_Top1W_Weekly");
          } else if (price === "Giá (Average)" && day === "1 ngày") {
            faKeys.push("AvgHL_VUOT_Top1W_Daily");
          } else if (price === "Giá (Average)" && day === "1 tuần") {
            faKeys.push("AvgHL_VUOT_Top1W_Weekly");
          } else if (price === "Average (H,L,C)" && day === "1 ngày") {
            faKeys.push("AvgHLC_VUOT_Top1W_Daily");
          } else if (price === "Average (H,L,C)" && day === "1 tuần") {
            faKeys.push("AvgHLC_VUOT_Top1W_Weekly");
          }
          break;
```

## Vượt đỉnh 4 tuần

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, =, Daily, VUOT, Weekly
```ts
let price1 = "";
          let day1 = "";

          switch (tieuChi.leftIndexValue) {
            case 0:
              price1 = "Giá (Close)";
              break;
            case 1:
              price1 = "Giá (Low)";
              break;
            case 2:
              price1 = "Giá (Average)";
              break;
            case 3:
              price1 = "Average (H,L,C)";
              break;

            default:
              break;
          }
          switch (tieuChi.interval) {
            case 0:
              day1 = "1 ngày";
              break;
            case 1:
              day1 = "1 tuần";
              break;

            default:
              break;
          }
          if (price1 === "Giá (Close)" && day1 === "1 ngày") {
            faKeys.push("Close_VUOT_Top4W_Daily");
          } else if (price1 === "Giá (Close)" && day1 === "1 tuần") {
            faKeys.push("Close_VUOT_Top4W_Weekly");
          } else if (price1 === "Giá (High)" && day1 === "1 ngày") {
            faKeys.push("High_VUOT_Top4W_Daily");
          } else if (price1 === "Giá (High)" && day1 === "1 tuần") {
            faKeys.push("High_VUOT_Top4W_Weekly");
          } else if (price1 === "Giá (Low)" && day1 === "1 ngày") {
            faKeys.push("Low_VUOT_Top4W_Daily");
          } else if (price1 === "Giá (Low)" && day1 === "1 tuần") {
            faKeys.push("Low_VUOT_Top4W_Weekly");
          } else if (price1 === "Giá (Average)" && day1 === "1 ngày") {
            faKeys.push("AvgHL_VUOT_Top4W_Daily");
          } else if (price1 === "Giá (Average)" && day1 === "1 tuần") {
            faKeys.push("AvgHL_VUOT_Top4W_Weekly");
          } else if (price1 === "Average (H,L,C)" && day1 === "1 ngày") {
            faKeys.push("AvgHLC_VUOT_Top4W_Daily");
          } else if (price1 === "Average (H,L,C)" && day1 === "1 tuần") {
            faKeys.push("AvgHLC_VUOT_Top4W_Weekly");
          }
          break;
```

## Vượt đỉnh 12 tuần

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, =, Daily, VUOT, Weekly
```ts
let price2 = "";
          let day2 = "";

          switch (tieuChi.leftIndexValue) {
            case 0:
              price2 = "Giá (Close)";
              break;
            case 1:
              price2 = "Giá (Low)";
              break;
            case 2:
              price2 = "Giá (Average)";
              break;
            case 3:
              price2 = "Average (H,L,C)";
              break;

            default:
              break;
          }
          switch (tieuChi.interval) {
            case 0:
              day2 = "1 ngày";
              break;
            case 1:
              day2 = "1 tuần";
              break;

            default:
              break;
          }
          if (price2 === "Giá (Close)" && day2 === "1 ngày") {
            faKeys.push("Close_VUOT_Top12W_Daily");
          } else if (price2 === "Giá (Close)" && day2 === "1 tuần") {
            faKeys.push("Close_VUOT_Top12W_Weekly");
          } else if (price2 === "Giá (High)" && day2 === "1 ngày") {
            faKeys.push("High_VUOT_Top12W_Daily");
          } else if (price2 === "Giá (High)" && day2 === "1 tuần") {
            faKeys.push("High_VUOT_Top12W_Weekly");
          } else if (price2 === "Giá (Low)" && day2 === "1 ngày") {
            faKeys.push("Low_VUOT_Top12W_Daily");
          } else if (price2 === "Giá (Low)" && day2 === "1 tuần") {
            faKeys.push("Low_VUOT_Top12W_Weekly");
          } else if (price2 === "Giá (Average)" && day2 === "1 ngày") {
            faKeys.push("AvgHL_VUOT_Top12W_Daily");
          } else if (price2 === "Giá (Average)" && day2 === "1 tuần") {
            faKeys.push("AvgHL_VUOT_Top12W_Weekly");
          } else if (price2 === "Average (H,L,C)" && day2 === "1 ngày") {
            faKeys.push("AvgHLC_VUOT_Top12W_Daily");
          } else if (price2 === "Average (H,L,C)" && day2 === "1 tuần") {
            faKeys.push("AvgHLC_VUOT_Top12W_Weekly");
          }
          break;
```

## Vượt đỉnh 52 tuần

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, 52, =, Daily, VUOT, Weekly
```ts
let price3 = "";
          let day3 = "";

          switch (tieuChi.leftIndexValue) {
            case 0:
              price3 = "Giá (Close)";
              break;
            case 1:
              price3 = "Giá (Low)";
              break;
            case 2:
              price3 = "Giá (Average)";
              break;
            case 3:
              price3 = "Average (H,L,C)";
              break;

            default:
              break;
          }
          switch (tieuChi.interval) {
            case 0:
              day3 = "1 ngày";
              break;
            case 1:
              day3 = "1 tuần";
              break;

            default:
              break;
          }
          if (price3 === "Giá (Close)" && day3 === "1 ngày") {
            faKeys.push("Close_VUOT_Top52W_Daily");
          } else if (price3 === "Giá (Close)" && day3 === "1 tuần") {
            faKeys.push("Close_VUOT_Top52W_Weekly");
          } else if (price3 === "Giá (High)" && day3 === "1 ngày") {
            faKeys.push("High_VUOT_Top52W_Daily");
          } else if (price3 === "Giá (High)" && day3 === "1 tuần") {
            faKeys.push("High_VUOT_Top52W_Weekly");
          } else if (price3 === "Giá (Low)" && day3 === "1 ngày") {
            faKeys.push("Low_VUOT_Top52W_Daily");
          } else if (price3 === "Giá (Low)" && day3 === "1 tuần") {
            faKeys.push("Low_VUOT_Top52W_Weekly");
          } else if (price3 === "Giá (Average)" && day3 === "1 ngày") {
            faKeys.push("AvgHL_VUOT_Top52W_Daily");
          } else if (price3 === "Giá (Average)" && day3 === "1 tuần") {
            faKeys.push("AvgHL_VUOT_Top52W_Weekly");
          } else if (price3 === "Average (H,L,C)" && day3 === "1 ngày") {
            faKeys.push("AvgHLC_VUOT_Top52W_Daily");
          } else if (price3 === "Average (H,L,C)" && day3 === "1 tuần") {
            faKeys.push("AvgHLC_VUOT_Top52W_Weekly");
          }
          break;
```

## Thủng đáy 1 tuần

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, =, Daily, THUNG, Weekly
```ts
let price4 = "";
          let day4 = "";

          switch (tieuChi.leftIndexValue) {
            case 0:
              price4 = "Giá (Close)";
              break;
            case 1:
              price4 = "Giá (Low)";
              break;
            case 2:
              price4 = "Giá (Average)";
              break;
            case 3:
              price4 = "Average (H,L,C)";
              break;

            default:
              break;
          }
          switch (tieuChi.interval) {
            case 0:
              day4 = "1 ngày";
              break;
            case 1:
              day4 = "1 tuần";
              break;

            default:
              break;
          }
          if (price4 === "Giá (Close)" && day4 === "1 ngày") {
            faKeys.push("Close_THUNG_Bottom1W_Daily");
          } else if (price4 === "Giá (Close)" && day4 === "1 tuần") {
            faKeys.push("Close_THUNG_Bottom1W_Weekly");
          } else if (price4 === "Giá (High)" && day4 === "1 ngày") {
            faKeys.push("High_THUNG_Bottom1W_Daily");
          } else if (price4 === "Giá (High)" && day4 === "1 tuần") {
            faKeys.push("High_THUNG_Bottom1W_Weekly");
          } else if (price4 === "Giá (Low)" && day4 === "1 ngày") {
            faKeys.push("Low_THUNG_Bottom1W_Daily");
          } else if (price4 === "Giá (Low)" && day4 === "1 tuần") {
            faKeys.push("Low_THUNG_Bottom1W_Weekly");
          } else if (price4 === "Giá (Average)" && day4 === "1 ngày") {
            faKeys.push("AvgHL_THUNG_Bottom1W_Daily");
          } else if (price4 === "Giá (Average)" && day4 === "1 tuần") {
            faKeys.push("AvgHL_THUNG_Bottom1W_Weekly");
          } else if (price4 === "Average (H,L,C)" && day4 === "1 ngày") {
            faKeys.push("AvgHLC_THUNG_Bottom1W_Daily");
          } else if (price4 === "Average (H,L,C)" && day4 === "1 tuần") {
            faKeys.push("AvgHLC_THUNG_Bottom1W_Weekly");
          }
          break;
```

## Thủng đáy 4 tuần

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, =, Daily, THUNG, Weekly
```ts
let price5 = "";
          let day5 = "";

          switch (tieuChi.leftIndexValue) {
            case 0:
              price5 = "Giá (Close)";
              break;
            case 1:
              price5 = "Giá (Low)";
              break;
            case 2:
              price5 = "Giá (Average)";
              break;
            case 3:
              price5 = "Average (H,L,C)";
              break;

            default:
              break;
          }
          switch (tieuChi.interval) {
            case 0:
              day5 = "1 ngày";
              break;
            case 1:
              day5 = "1 tuần";
              break;

            default:
              break;
          }
          if (price5 === "Giá (Close)" && day5 === "1 ngày") {
            faKeys.push("Close_THUNG_Bottom4W_Daily");
          } else if (price5 === "Giá (Close)" && day5 === "1 tuần") {
            faKeys.push("Close_THUNG_Bottom4W_Weekly");
          } else if (price5 === "Giá (High)" && day5 === "1 ngày") {
            faKeys.push("High_THUNG_Bottom4W_Daily");
          } else if (price5 === "Giá (High)" && day5 === "1 tuần") {
            faKeys.push("High_THUNG_Bottom4W_Weekly");
          } else if (price5 === "Giá (Low)" && day5 === "1 ngày") {
            faKeys.push("Low_THUNG_Bottom4W_Daily");
          } else if (price5 === "Giá (Low)" && day5 === "1 tuần") {
            faKeys.push("Low_THUNG_Bottom4W_Weekly");
          } else if (price5 === "Giá (Average)" && day5 === "1 ngày") {
            faKeys.push("AvgHL_THUNG_Bottom4W_Daily");
          } else if (price5 === "Giá (Average)" && day5 === "1 tuần") {
            faKeys.push("AvgHL_THUNG_Bottom4W_Weekly");
          } else if (price5 === "Average (H,L,C)" && day5 === "1 ngày") {
            faKeys.push("AvgHLC_THUNG_Bottom4W_Daily");
          } else if (price5 === "Average (H,L,C)" && day5 === "1 tuần") {
            faKeys.push("AvgHLC_THUNG_Bottom4W_Weekly");
          }
          break;
```

## Thủng đáy 12 tuần

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, 6, =, Daily, THUNG, Weekly
```ts
let price6 = "";
          let day6 = "";

          switch (tieuChi.leftIndexValue) {
            case 0:
              price6 = "Giá (Close)";
              break;
            case 1:
              price6 = "Giá (Low)";
              break;
            case 2:
              price6 = "Giá (Average)";
              break;
            case 3:
              price6 = "Average (H,L,C)";
              break;

            default:
              break;
          }
          switch (tieuChi.interval) {
            case 0:
              day6 = "1 ngày";
              break;
            case 1:
              day6 = "1 tuần";
              break;

            default:
              break;
          }
          if (price6 === "Giá (Close)" && day6 === "1 ngày") {
            faKeys.push("Close_THUNG_Bottom12W_Daily");
          } else if (price6 === "Giá (Close)" && day6 === "1 tuần") {
            faKeys.push("Close_THUNG_Bottom12W_Weekly");
          } else if (price6 === "Giá (High)" && day6 === "1 ngày") {
            faKeys.push("High_THUNG_Bottom12W_Daily");
          } else if (price6 === "Giá (High)" && day6 === "1 tuần") {
            faKeys.push("High_THUNG_Bottom12W_Weekly");
          } else if (price6 === "Giá (Low)" && day6 === "1 ngày") {
            faKeys.push("Low_THUNG_Bottom12W_Daily");
          } else if (price6 === "Giá (Low)" && day6 === "1 tuần") {
            faKeys.push("Low_THUNG_Bottom12W_Weekly");
          } else if (price6 === "Giá (Average)" && day6 === "1 ngày") {
            faKeys.push("AvgHL_THUNG_Bottom12W_Daily");
          } else if (price6 === "Giá (Average)" && day6 === "1 tuần") {
            faKeys.push("AvgHL_THUNG_Bottom12W_Weekly");
          } else if (price6 === "Average (H,L,C)" && day6 === "1 ngày") {
            faKeys.push("AvgHLC_THUNG_Bottom12W_Daily");
          } else if (price6 === "Average (H,L,C)" && day6 === "1 tuần") {
            faKeys.push("AvgHLC_THUNG_Bottom12W_Weekly");
          }
          break;
```

## Thủng đáy 52 tuần

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, 52, =, Daily, THUNG, Weekly
```ts
let price7 = "";
          let day7 = "";

          switch (tieuChi.leftIndexValue) {
            case 0:
              price7 = "Giá (Close)";
              break;
            case 1:
              price7 = "Giá (Low)";
              break;
            case 2:
              price7 = "Giá (Average)";
              break;
            case 3:
              price7 = "Average (H,L,C)";
              break;

            default:
              break;
          }
          switch (tieuChi.interval) {
            case 0:
              day7 = "1 ngày";
              break;
            case 1:
              day7 = "1 tuần";
              break;

            default:
              break;
          }
          if (price7 === "Giá (Close)" && day7 === "1 ngày") {
            faKeys.push("Close_THUNG_Bottom52W_Daily");
          } else if (price7 === "Giá (Close)" && day7 === "1 tuần") {
            faKeys.push("Close_THUNG_Bottom52W_Weekly");
          } else if (price7 === "Giá (High)" && day7 === "1 ngày") {
            faKeys.push("High_THUNG_Bottom52W_Daily");
          } else if (price7 === "Giá (High)" && day7 === "1 tuần") {
            faKeys.push("High_THUNG_Bottom52W_Weekly");
          } else if (price7 === "Giá (Low)" && day7 === "1 ngày") {
            faKeys.push("Low_THUNG_Bottom52W_Daily");
          } else if (price7 === "Giá (Low)" && day7 === "1 tuần") {
            faKeys.push("Low_THUNG_Bottom52W_Weekly");
          } else if (price7 === "Giá (Average)" && day7 === "1 ngày") {
            faKeys.push("AvgHL_THUNG_Bottom52W_Daily");
          } else if (price7 === "Giá (Average)" && day7 === "1 tuần") {
            faKeys.push("AvgHL_THUNG_Bottom52W_Weekly");
          } else if (price7 === "Average (H,L,C)" && day7 === "1 ngày") {
            faKeys.push("AvgHLC_THUNG_Bottom52W_Daily");
          } else if (price7 === "Average (H,L,C)" && day7 === "1 tuần") {
            faKeys.push("AvgHLC_THUNG_Bottom52W_Weekly");
          }
          break;
```

## Số phiên tăng giá liên tục

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, =, Daily, UP
```ts
let price8 = "";
          let day8 = "";

          switch (tieuChi.leftIndexValue) {
            case 0:
              price8 = "Giá (Close)";
              break;
            case 1:
              price8 = "Giá (Low)";
              break;
            case 2:
              price8 = "Giá ((H+L)/2)";
              break;
            case 3:
              price8 = "Giá ((O + H + L + C)/4)";
              break;

            default:
              break;
          }

          switch (tieuChi.interval) {
            case 0:
              day8 = "1 ngày";
              break;
            case 1:
              day8 = "1 tuần";
              break;

            default:
              break;
          }

          const slider = tieuChi.rightIndexValue;
          if (price8 === "Giá (Close)" && day8 === "1 ngày") {
            faKeys.push(`Close_UP_${slider}_Daily`);
          } else if (price8 === "Giá (Close)" && day8 === "1 tuần") {
            faKeys.push(`Close_UP_${slider}_Daily`);
          } else if (price8 === "Giá (High)" && day8 === "1 ngày") {
            faKeys.push(`Close_UP_${slider}_Daily`);
          } else if (price8 === "Giá (High)" && day8 === "1 tuần") {
            faKeys.push(`Close_UP_${slider}_Daily`);
          } else if (price8 === "Giá (Low)" && day8 === "1 ngày") {
            faKeys.push(`Close_UP_${slider}_Daily`);
          } else if (price8 === "Giá (Low)" && day8 === "1 tuần") {
            faKeys.push(`Close_UP_${slider}_Daily`);
          } else if (price8 === "Giá ((H+L)/2)" && day8 === "1 ngày") {
            faKeys.push(`Close_UP_${slider}_Daily`);
          } else if (price8 === "Giá ((H+L)/2)" && day8 === "1 tuần") {
            faKeys.push(`Close_UP_${slider}_Daily`);
          } else if (
            price8 === "Giá ((O + H + L + C)/4)" &&
            day8 === "1 ngày"
          ) {
            faKeys.push(`Close_UP_${slider}_Daily`);
          } else if (
            price8 === "Giá ((O + H + L + C)/4)" &&
            day8 === "1 tuần"
          ) {
            faKeys.push(`Close_UP_${slider}_Daily`);
          }
          break;
```

## Số phiên giảm giá liên tục

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, =, DOWN, Daily
```ts
let price9 = "";
          let day9 = "";

          switch (tieuChi.leftIndexValue) {
            case 0:
              price9 = "Giá (Close)";
              break;
            case 1:
              price9 = "Giá (Low)";
              break;
            case 2:
              price9 = "Giá ((H+L)/2)";
              break;
            case 3:
              price9 = "Giá ((O + H + L + C)/4)";
              break;

            default:
              break;
          }

          switch (tieuChi.interval) {
            case 0:
              day9 = "1 ngày";
              break;
            case 1:
              day9 = "1 tuần";
              break;

            default:
              break;
          }

          const slider1 = tieuChi.rightIndexValue;
          if (price9 === "Giá (Close)" && day9 === "1 ngày") {
            faKeys.push(`Close_DOWN_${slider1}_Daily`);
          } else if (price9 === "Giá (Close)" && day9 === "1 tuần") {
            faKeys.push(`Close_DOWN_${slider1}_Daily`);
          } else if (price9 === "Giá (High)" && day9 === "1 ngày") {
            faKeys.push(`Close_DOWN_${slider1}_Daily`);
          } else if (price9 === "Giá (High)" && day9 === "1 tuần") {
            faKeys.push(`Close_DOWN_${slider1}_Daily`);
          } else if (price9 === "Giá (Low)" && day9 === "1 ngày") {
            faKeys.push(`Close_DOWN_${slider1}_Daily`);
          } else if (price9 === "Giá (Low)" && day9 === "1 tuần") {
            faKeys.push(`Close_DOWN_${slider1}_Daily`);
          } else if (price9 === "Giá ((H+L)/2)" && day9 === "1 ngày") {
            faKeys.push(`Close_DOWN_${slider1}_Daily`);
          } else if (price9 === "Giá ((H+L)/2)" && day9 === "1 tuần") {
            faKeys.push(`Close_DOWN_${slider1}_Daily`);
          } else if (
            price9 === "Giá ((O + H + L + C)/4)" &&
            day9 === "1 ngày"
          ) {
            faKeys.push(`Close_DOWN_${slider1}_Daily`);
          } else if (
            price9 === "Giá ((O + H + L + C)/4)" &&
            day9 === "1 tuần"
          ) {
            faKeys.push(`Close_DOWN_${slider1}_Daily`);
          }
          break;
```

## Số phiên KL giảm liên tiếp

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, 10, =, DOWN, Daily, Weekly
```ts
const slider2 = tieuChi.rightIndexValue;
          let day10 = "";
          switch (tieuChi.interval) {
            case 0:
              day10 = "1 ngày";
              break;
            case 1:
              day10 = "1 tuần";
              break;

            default:
              break;
          }
          if ((day10 = "1 ngày")) {
            faKeys.push(`Vol_DOWN_${slider2}_Daily`);
          } else if ((day10 = "1 tuần")) {
            faKeys.push(`Vol_DOWN_${slider2}_Weekly`);
          }
          break;
```

## Số phiên KL tăng liên tiếp

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, =, Daily, UP, Weekly
```ts
const slider3 = tieuChi.rightIndexValue;
          let day11 = "";
          switch (tieuChi.interval) {
            case 0:
              day11 = "1 ngày";
              break;
            case 1:
              day11 = "1 tuần";
              break;

            default:
              break;
          }
          if ((day11 = "1 ngày")) {
            faKeys.push(`Vol_UP_${slider3}_Daily`);
          } else if ((day11 = "1 tuần")) {
            faKeys.push(`Vol_UP_${slider3}_Weekly`);
          }
          break;
```

## Khối lượng khớp lệnh đang cao nhất

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, =, Daily, Weekly
```ts
const slider4 = tieuChi.rightIndexValue;
          let day12 = "";
          switch (tieuChi.interval) {
            case 0:
              day12 = "1 ngày";
              break;
            case 1:
              day12 = "1 tuần";
              break;

            default:
              break;
          }
          if ((day12 = "1 ngày")) {
            faKeys.push(`Vol_MAX_${slider4}_Daily`);
          } else if ((day12 = "1 tuần")) {
            faKeys.push(`Vol_MAX_${slider4}_Weekly`);
          }

          break;
```

## Khối lượng khớp lệnh đang thấp nhất

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, =, Daily, Weekly
```ts
const slider5 = tieuChi.rightIndexValue;
          let day33 = "";
          switch (tieuChi.interval) {
            case 0:
              day33 = "1 ngày";
              break;
            case 1:
              day33 = "1 tuần";
              break;

            default:
              break;
          }
          if ((day33 = "1 ngày")) {
            faKeys.push(`Vol_MIN_${slider5}_Daily`);
          } else if ((day33 = "1 tuần")) {
            faKeys.push(`Vol_MIN_${slider5}_Weekly`);
          }

          break;
```

## Tổng KL khớp hiện tại tăng đột biến so với TBKL cùng thời điểm 5 ngày liền trước

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, 6, 70, =, >=, Daily
```ts
let percentClick = "";
          switch (tieuChi.percent) {
            case 0:
              percentClick = "70";
              break;
            case 1:
              percentClick = "80";
              break;
            case 2:
              percentClick = "90";
              break;
            case 3:
              percentClick = "100";
              break;
            case 4:
              percentClick = "110";
              break;
            case 5:
              percentClick = "120";
              break;
            case 6:
              percentClick = "130";
              break;
            case 7:
              percentClick = "150";
              break;
            case 8:
              percentClick = "200";
              break;
            default:
              break;
          }

          faKeys.push(`MutationAvgVol5D_>=_${percentClick}_Daily`);

          break;
```

## Tổng KL khớp hiện tại tăng đột biến so với TBKL cùng thời điểm 10 ngày liền trước

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, 10, 6, 70, =, >=, Daily
```ts
let percentClick1 = "";
          switch (tieuChi.percent) {
            case 0:
              percentClick1 = "70";
              break;
            case 1:
              percentClick1 = "80";
              break;
            case 2:
              percentClick1 = "90";
              break;
            case 3:
              percentClick1 = "100";
              break;
            case 4:
              percentClick1 = "110";
              break;
            case 5:
              percentClick1 = "120";
              break;
            case 6:
              percentClick1 = "130";
              break;
            case 7:
              percentClick1 = "150";
              break;
            case 8:
              percentClick1 = "200";
              break;
            default:
              break;
          }

          faKeys.push(`MutationAvgVol10D_>=_${percentClick1}_Daily`);

          break;
```

## Tổng KL khớp hiện tại tăng đột biến so với TBKL cùng thời điểm 20 ngày liền trước

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, 20, 6, 70, =, >=, Daily
```ts
let percentClick2 = "";
          switch (tieuChi.percent) {
            case 0:
              percentClick2 = "70";
              break;
            case 1:
              percentClick2 = "80";
              break;
            case 2:
              percentClick2 = "90";
              break;
            case 3:
              percentClick2 = "100";
              break;
            case 4:
              percentClick2 = "110";
              break;
            case 5:
              percentClick2 = "120";
              break;
            case 6:
              percentClick2 = "130";
              break;
            case 7:
              percentClick2 = "150";
              break;
            case 8:
              percentClick2 = "200";
              break;
            default:
              break;
          }

          faKeys.push(`MutationAvgVol20D_>=_${percentClick2}_Daily`);

          break;
```

## Tổng KL khớp hiện tại tăng đột biến so với TBKL cùng thời điểm 60 ngày liền trước

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, 6, 60, 70, =, >=, Daily
```ts
let percentClick3 = "";
          switch (tieuChi.percent) {
            case 0:
              percentClick3 = "70";
              break;
            case 1:
              percentClick3 = "80";
              break;
            case 2:
              percentClick3 = "90";
              break;
            case 3:
              percentClick3 = "100";
              break;
            case 4:
              percentClick3 = "110";
              break;
            case 5:
              percentClick3 = "120";
              break;
            case 6:
              percentClick3 = "130";
              break;
            case 7:
              percentClick3 = "150";
              break;
            case 8:
              percentClick3 = "200";
              break;
            default:
              break;
          }

          faKeys.push(`MutationAvgVol60D_>=_${percentClick3}_Daily`);

          break;
```

## KL tăng so với cùng thời điểm của phiên liền trước

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, 6, 70, =, >=, Daily
```ts
let percentClick4 = "";
          switch (tieuChi.percent) {
            case 0:
              percentClick4 = "70";
              break;
            case 1:
              percentClick4 = "80";
              break;
            case 2:
              percentClick4 = "90";
              break;
            case 3:
              percentClick4 = "100";
              break;
            case 4:
              percentClick4 = "110";
              break;
            case 5:
              percentClick4 = "120";
              break;
            case 6:
              percentClick4 = "130";
              break;
            case 7:
              percentClick4 = "150";
              break;
            case 8:
              percentClick4 = "200";
              break;
            default:
              break;
          }

          faKeys.push(`MutationVolT1_>=_${percentClick4}_Daily`);

          break;
```

## KL trong phiên đạt bằng Khối lượng phiên giao dịch trước

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, 6, 70, =, Daily
```ts
let percentClick5 = "";
          switch (tieuChi.percent) {
            case 0:
              percentClick5 = "70";
              break;
            case 1:
              percentClick5 = "80";
              break;
            case 2:
              percentClick5 = "90";
              break;
            case 3:
              percentClick5 = "100";
              break;
            case 4:
              percentClick5 = "110";
              break;
            case 5:
              percentClick5 = "120";
              break;
            case 6:
              percentClick5 = "130";
              break;
            case 7:
              percentClick5 = "150";
              break;
            case 8:
              percentClick5 = "200";
              break;
            default:
              break;
          }

          faKeys.push(`Vol_${percentClick5}_VolT1_Daily`);

          break;
```

## Doanh thu (TTM)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `NetSale_TTM`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## Doanh thu (năm gần nhất)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `NetSale_MRY`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## Lợi nhuận sau thuế (TTM)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `Profit_TTM`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## Lợi nhuận sau thuế (năm gần nhất)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `Profit_MRY`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## Biên lợi nhuận gộp (TTM - %)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `MG_GrossMargin_TTM`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
```

## Biên lợi nhuận gộp (5 năm - %)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `MG_GrossMargin_Avg_5Y`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
```

## Biên lợi nhuận hoạt động (TTM - %)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `MG_OperatingMargin`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
```

## Biên lợi nhuận hoạt động (5 năm - %)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `MG_OperatingMargin_Avg_5Y`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
```

## Biên lợi nhuận trước thuế (TTM - %)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `MG_PretaxMargin_TTM`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
```

## Biên lợi nhuận trước thuế (5 năm - %)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `MG_PretaxMargin_Avg_5Y`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
```

## Tỷ lệ thanh toán nhanh (MRQ)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `FS_QuickRatio`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## Tổng nợ/Vốn CSH (Total Debt to Equity)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `FS_DebtOnEquityRatio`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## Dòng tiền từ hoạt động kinh doanh

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0, =
```ts
let month = "";
          switch (tieuChi.month) {
            case 0:
              month = "MRQ";
              break;
            case 1:
              month = "MRQ_2";
              break;
            case 2:
              month = "TTM";
              break;
            case 3:
              month = "MRY";
              break;

            default:
              break;
          }
          fAFilterSub.push({
            key: `CF_Operating_${month}_FH`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## Dòng tiền từ hoạt động đầu tư 

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0, =
```ts
let month1 = "";
          switch (tieuChi.month) {
            case 0:
              month1 = "MRQ";
              break;
            case 1:
              month1 = "MRQ_2";
              break;
            case 2:
              month1 = "TTM";
              break;
            case 3:
              month1 = "MRY";
              break;

            default:
              break;
          }
          fAFilterSub.push({
            key: `CF_Investing_${month1}_FH`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## Dòng tiền từ hoạt động tài chính

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0, =
```ts
let month2 = "";
          switch (tieuChi.month) {
            case 0:
              month2 = "MRQ";
              break;
            case 1:
              month2 = "MRQ_2";
              break;
            case 2:
              month2 = "TTM";
              break;
            case 3:
              month2 = "MRY";
              break;

            default:
              break;
          }
          fAFilterSub.push({
            key: `CF_Financing_${month2}_FH`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## Dòng tiền tổng hợp

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0, =
```ts
let month3 = "";
          switch (tieuChi.month) {
            case 0:
              month3 = "MRQ";
              break;
            case 1:
              month3 = "MRQ_2";
              break;
            case 2:
              month3 = "TTM";
              break;
            case 3:
              month3 = "MRY";
              break;

            default:
              break;
          }
          fAFilterSub.push({
            key: `CF_Total_${month3}_FH`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## Dòng tiền tự do

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0, =
```ts
let month4 = "";
          switch (tieuChi.month) {
            case 0:
              month4 = "MRQ";
              break;
            case 1:
              month4 = "MRQ_2";
              break;
            case 2:
              month4 = "TTM";
              break;
            case 3:
              month4 = "MRY";
              break;

            default:
              break;
          }
          fAFilterSub.push({
            key: `CF_FreeCashFlow_${month4}_FH`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## Dòng tiền từ HĐKD/DT thuần

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0, =
```ts
let month5 = "";
          switch (tieuChi.month) {
            case 0:
              month5 = "MRQ";
              break;
            case 1:
              month5 = "MRQ_2";
              break;
            case 2:
              month5 = "TTM";
              break;
            case 3:
              month5 = "MRY";
              break;

            default:
              break;
          }
          fAFilterSub.push({
            key: `CF_OperatingNetSalePercent_${month5}_FH`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## Cổ tức (bằng tiền) năm gần nhất

- **Destination:** booleanFilter
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0, =
```ts
let boolean = "";
          switch (tieuChi.boolean) {
            case 0:
              boolean = "HasCashDividend_LastYear";
              break;
            case 1:
              boolean = "";
              break;
            default:
              break;
          }
          booleanFilter.push({
            key: boolean,
            value: true,
          });
          break;
```

## Cổ tức đều đặn trên 3 năm

- **Destination:** booleanFilter
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0, =
```ts
let boolean1 = "";
          switch (tieuChi.boolean) {
            case 0:
              boolean1 = "HasCashDividend_Last3Years";
              break;
            case 1:
              boolean1 = "";
              break;
            default:
              break;
          }
          booleanFilter.push({
            key: boolean1,
            value: true,
          });
          break;
```

## Cổ tức bằng tiền (năm gần nhất)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `CashDividend_LastYear`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## Tỷ suất cổ tức

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `DividendYield_LastYear`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
```

## Thu nhập từ cổ tức năm gần nhất theo giá hiện tại (%)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `CashDividendYield_LastYear_CurrentPrice`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
```

## Thu nhập từ cổ tức bình quân 3 năm (%)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `DividendYield_Avg_3Y`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
```

## Tăng trưởng cổ tức (%)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `CashDividend_Growth`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
```

## Thu nhập từ cổ tực dự kiến (%)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `CashDividendYield_ThisYearPlan_CurrentPrice`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
```

## Tỷ lệ chi trả cổ tức (%)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** no
- **Tokens seen:** 0
```ts
faFilter.push({
            key: `CashDividendRatio_LastYear`,
            value: {
              min: (
                ConvertStringToNumber(tieuChi.rightIndexValue[0]) / 100
              ).toString(),
              max: (
                ConvertStringToNumber(tieuChi.rightIndexValue[1]) / 100
              ).toString(),
            },
          });
          break;
```

## Giá so với đường TB - EMA

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, 10, 14, 20, 50, 6, <=, =, >=, Daily, Weekly
```ts
let checkCompare = "";
          let day14 = "";
          let ema = "";
          switch (tieuChi.compare) {
            case 0:
              checkCompare = ">=";
              break;
            case 1:
              checkCompare = "=";
              break;

            case 2:
              checkCompare = "<=";
              break;
            default:
              break;
          }
          switch (tieuChi.rightIndexValue) {
            case 0:
              ema = "EMA5";
              break;
            case 1:
              ema = "EMA10";
              break;
            case 2:
              ema = "EMA15";
              break;
            case 3:
              ema = "EMA20";
              break;
            case 4:
              ema = "EMA50";
              break;
            case 5:
              ema = "EMA100";
              break;
            case 6:
              ema = "EMA200";
              break;
            default:
              break;
          }
          switch (tieuChi.interval) {
            case 0:
              day14 = "Daily";
              break;
            case 1:
              day14 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`Close_${checkCompare}_${ema}_${day14}`);
          break;
```

## Giá cắt đường TB - EMA 

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, 10, 20, 50, 6, <=, =, >=, Daily, VUOT, Weekly
```ts
let checkCompare1 = "";
          let day15 = "";
          let ema1 = "";
          switch (tieuChi.compare) {
            case 0:
              checkCompare1 = ">=";
              break;
            case 1:
              checkCompare1 = "=";
              break;

            case 2:
              checkCompare1 = "<=";
              break;
            default:
              break;
          }
          switch (tieuChi.rightIndexValue) {
            case 0:
              ema1 = "EMA5";
              break;
            case 1:
              ema1 = "EMA10";
              break;
            case 2:
              ema1 = "EMA15";
              break;
            case 3:
              ema1 = "EMA20";
              break;
            case 4:
              ema1 = "EMA50";
              break;
            case 5:
              ema1 = "EMA100";
              break;
            case 6:
              ema1 = "EMA200";
              break;
            default:
              break;
          }
          switch (tieuChi.interval) {
            case 0:
              day15 = "Daily";
              break;
            case 1:
              day15 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`Close_VUOT_${checkCompare1}_${ema1}_${day15}`);
          break;
```

## So sánh 2 đường TB - EMA 

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, 10, 20, 50, 6, <=, =, >=, Daily, Weekly
```ts
let checkCompare2 = "";
          let day16 = "";
          let ema2 = "";
          let ema02 = "";

          switch (tieuChi.compare) {
            case 0:
              checkCompare2 = ">=";
              break;
            case 1:
              checkCompare2 = "=";
              break;

            case 2:
              checkCompare2 = "<=";
              break;
            default:
              break;
          }
          switch (tieuChi.leftIndexValue) {
            case 0:
              ema02 = "EMA5";
              break;
            case 1:
              ema02 = "EMA10";
              break;
            case 2:
              ema02 = "EMA15";
              break;
            case 3:
              ema02 = "EMA20";
              break;
            case 4:
              ema02 = "EMA50";
              break;
            case 5:
              ema02 = "EMA100";
              break;
            case 6:
              ema02 = "EMA200";
              break;
            default:
              break;
          }
          switch (tieuChi.rightIndexValue) {
            case 0:
              ema2 = "EMA5";
              break;
            case 1:
              ema2 = "EMA10";
              break;
            case 2:
              ema2 = "EMA15";
              break;
            case 3:
              ema2 = "EMA20";
              break;
            case 4:
              ema2 = "EMA50";
              break;
            case 5:
              ema2 = "EMA100";
              break;
            case 6:
              ema2 = "EMA200";
              break;
            default:
              break;
          }
          switch (tieuChi.interval) {
            case 0:
              day16 = "Daily";
              break;
            case 1:
              day16 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`${ema02}_${checkCompare2}_${ema2}_${day16}`);
          break;
```

## Giao cắt 2 đường TB - EMA 

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, 10, 20, 50, 6, =, Daily, THUNG, VUOT, Weekly
```ts
let checkCompare3 = "";
          let day17 = "";
          let ema3 = "";
          let change = "";
          switch (tieuChi.compare) {
            case 0:
              change = "VUOT";
              break;
            case 1:
              change = "THUNG";
              break;
            default:
              break;
          }
          switch (tieuChi.leftIndexValue) {
            case 0:
              checkCompare3 = "EMA5";
              break;
            case 1:
              checkCompare3 = "EMA10";
              break;
            case 2:
              checkCompare3 = "EMA15";
              break;
            case 3:
              checkCompare3 = "EMA20";
              break;
            case 4:
              checkCompare3 = "EMA50";
              break;
            case 5:
              checkCompare3 = "EMA100";
              break;
            case 6:
              checkCompare3 = "EMA200";
              break;
            default:
              break;
          }
          switch (tieuChi.rightIndexValue) {
            case 0:
              ema3 = "EMA5";
              break;
            case 1:
              ema3 = "EMA10";
              break;
            case 2:
              ema3 = "EMA15";
              break;
            case 3:
              ema3 = "EMA20";
              break;
            case 4:
              ema3 = "EMA50";
              break;
            case 5:
              ema3 = "EMA100";
              break;
            case 6:
              ema3 = "EMA200";
              break;
            default:
              break;
          }
          switch (tieuChi.interval) {
            case 0:
              day17 = "Daily";
              break;
            case 1:
              day17 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`${checkCompare3}_${change}_${ema3}_${day17}`);
          break;
```

## Giá so với đường TB - MA

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, 10, 20, 50, 6, <=, =, >=, Daily, Weekly
```ts
let checkCompare4 = "";
          let day18 = "";
          let ema4 = "";
          switch (tieuChi.compare) {
            case 0:
              checkCompare4 = ">=";
              break;
            case 1:
              checkCompare4 = "=";
              break;

            case 2:
              checkCompare4 = "<=";
              break;
            default:
              break;
          }
          switch (tieuChi.rightIndexValue) {
            case 0:
              ema4 = "SMA5";
              break;
            case 1:
              ema4 = "SMA10";
              break;
            case 2:
              ema4 = "SMA15";
              break;
            case 3:
              ema4 = "SMA20";
              break;
            case 4:
              ema4 = "SMA50";
              break;
            case 5:
              ema4 = "SMA100";
              break;
            case 6:
              ema4 = "SMA200";
              break;
            default:
              break;
          }
          switch (tieuChi.interval) {
            case 0:
              day18 = "Daily";
              break;
            case 1:
              day18 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`CLOSE_${checkCompare4}_${ema4}_${day18}`);
          break;
```

## So sánh 2 đường TB - MA

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, 10, 20, 50, 6, <=, =, >=, Daily, Weekly
```ts
let checkCompare5 = "";
          let day19 = "";
          let ema5 = "";
          let ema05 = "";
          switch (tieuChi.compare) {
            case 0:
              checkCompare5 = ">=";
              break;
            case 1:
              checkCompare5 = "=";
              break;

            case 2:
              checkCompare5 = "<=";
              break;
            default:
              break;
          }
          switch (tieuChi.leftIndexValue) {
            case 0:
              ema05 = "SMA5";
              break;
            case 1:
              ema05 = "SMA10";
              break;
            case 2:
              ema05 = "SMA15";
              break;
            case 3:
              ema05 = "SMA20";
              break;
            case 4:
              ema05 = "SMA50";
              break;
            case 5:
              ema05 = "SMA100";
              break;
            case 6:
              ema05 = "SMA200";
              break;
            default:
              break;
          }
          switch (tieuChi.rightIndexValue) {
            case 0:
              ema5 = "SMA5";
              break;
            case 1:
              ema5 = "SMA10";
              break;
            case 2:
              ema5 = "SMA15";
              break;
            case 3:
              ema5 = "SMA20";
              break;
            case 4:
              ema5 = "SMA50";
              break;
            case 5:
              ema5 = "SMA100";
              break;
            case 6:
              ema5 = "SMA200";
              break;
            default:
              break;
          }
          switch (tieuChi.interval) {
            case 0:
              day19 = "Daily";
              break;
            case 1:
              day19 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`${ema05}_${checkCompare5}_${ema5}_${day19}`);
          break;
```

## Giao cắt 2 đường TB - MA

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, 10, 20, 50, 6, =, Daily, THUNG, VUOT, Weekly
```ts
let checkCompare6 = "";
          let day20 = "";
          let ema6 = "";
          let change1 = "";
          switch (tieuChi.compare) {
            case 0:
              change1 = "VUOT";
              break;
            case 1:
              change1 = "THUNG";
              break;
            default:
              break;
          }
          switch (tieuChi.leftIndexValue) {
            case 0:
              checkCompare6 = "EMA5";
              break;
            case 1:
              checkCompare6 = "EMA10";
              break;
            case 2:
              checkCompare6 = "EMA15";
              break;
            case 3:
              checkCompare6 = "EMA20";
              break;
            case 4:
              checkCompare6 = "EMA50";
              break;
            case 5:
              checkCompare6 = "EMA100";
              break;
            case 6:
              checkCompare6 = "EMA200";
              break;
            default:
              break;
          }
          switch (tieuChi.rightIndexValue) {
            case 0:
              ema6 = "EMA5";
              break;
            case 1:
              ema6 = "EMA10";
              break;
            case 2:
              ema6 = "EMA15";
              break;
            case 3:
              ema6 = "EMA20";
              break;
            case 4:
              ema6 = "EMA50";
              break;
            case 5:
              ema6 = "EMA100";
              break;
            case 6:
              ema6 = "EMA200";
              break;
            default:
              break;
          }
          switch (tieuChi.interval) {
            case 0:
              day20 = "Daily";
              break;
            case 1:
              day20 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`${checkCompare6}_${change1}_${ema6}_${day20}`);
          break;
```

## Giá cắt đường TB - MA

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, 10, 20, 50, 6, =, Daily, THUNG, VUOT, Weekly
```ts
let day21 = "";
          let ema7 = "";
          let change2 = "";
          switch (tieuChi.compare) {
            case 0:
              change2 = "VUOT";
              break;
            case 1:
              change2 = "THUNG";
              break;
            default:
              break;
          }

          switch (tieuChi.rightIndexValue) {
            case 0:
              ema7 = "EMA5";
              break;
            case 1:
              ema7 = "EMA10";
              break;
            case 2:
              ema7 = "EMA15";
              break;
            case 3:
              ema7 = "EMA20";
              break;
            case 4:
              ema7 = "EMA50";
              break;
            case 5:
              ema7 = "EMA100";
              break;
            case 6:
              ema7 = "EMA200";
              break;
            default:
              break;
          }
          switch (tieuChi.interval) {
            case 0:
              day21 = "Daily";
              break;
            case 1:
              day21 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`CLOSE_${change2}_${ema7}_${day21}`);
          break;
```

## Giá so với Tenkan(9)

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, <=, =, >=, Daily, Weekly
```ts
let checkCompare7 = "";
          let day22 = "";

          switch (tieuChi.compare) {
            case 0:
              checkCompare7 = ">=";
              break;
            case 1:
              checkCompare7 = "=";
              break;

            case 2:
              checkCompare7 = "<=";
              break;
            default:
              break;
          }

          switch (tieuChi.interval) {
            case 0:
              day22 = "Daily";
              break;
            case 1:
              day22 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`CLOSE_${checkCompare7}_Tenkan_${day22}`);
          break;
```

## Giá so với Kijun(26)

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, <=, =, >=, Daily, Weekly
```ts
let checkCompare8 = "";
          let day23 = "";

          switch (tieuChi.compare) {
            case 1:
              checkCompare8 = ">=";
              break;
            case 2:
              checkCompare8 = "=";
              break;

            case 4:
              checkCompare8 = "<=";
              break;
            default:
              break;
          }

          switch (tieuChi.interval) {
            case 0:
              day23 = "Daily";
              break;
            case 1:
              day23 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`CLOSE_${checkCompare8}_Kijun_${day23}`);
          break;
```

## Giá so với Cloud(52)

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, <=, =, >=, Daily, Weekly
```ts
let checkCompare9 = "";
          let day24 = "";

          switch (tieuChi.compare) {
            case 0:
              checkCompare9 = ">=";
              break;
            case 1:
              checkCompare9 = "=";
              break;

            case 2:
              checkCompare9 = "<=";
              break;
            default:
              break;
          }

          switch (tieuChi.interval) {
            case 0:
              day24 = "Daily";
              break;
            case 1:
              day24 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(
            `CLOSE_${checkCompare9}_SpanA_${day24}`,
            `CLOSE_${checkCompare9}_SpanB_${day24}`
          );
          break;
```

## Giá giao cắt với Tenkan(9)

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, =, Daily, THUNG, VUOT, Weekly
```ts
let change3 = "";
          let day25 = "";

          switch (tieuChi.compare) {
            case 0:
              change3 = "VUOT";
              break;
            case 1:
              change3 = "THUNG";
              break;
            default:
              break;
          }

          switch (tieuChi.interval) {
            case 0:
              day25 = "Daily";
              break;
            case 1:
              day25 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`CLOSE_${change3}_Tenkan_${day25}`);
          break;
```

## Giá giao cắt với Kijun(26)

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, =, Daily, THUNG, VUOT, Weekly
```ts
let change4 = "";
          let day26 = "";

          switch (tieuChi.compare) {
            case 0:
              change4 = "VUOT";
              break;
            case 1:
              change4 = "THUNG";
              break;
            default:
              break;
          }

          switch (tieuChi.interval) {
            case 0:
              day26 = "Daily";
              break;
            case 1:
              day26 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`CLOSE_${change4}_Kijun_${day26}`);
          break;
```

## Giá giao cắt với Cloud(52)

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, =, Daily, THUNG, VUOT, Weekly
```ts
let change5 = "";
          let day27 = "";

          switch (tieuChi.compare) {
            case 0:
              change5 = "VUOT";
              break;
            case 1:
              change5 = "THUNG";
              break;
            default:
              break;
          }

          switch (tieuChi.interval) {
            case 0:
              day27 = "Daily";
              break;
            case 1:
              day27 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`CLOSE_${change5}_Cloud_${day27}`);
          break;
```

## Giao cắt thành phần Tenkan và Kijun

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, 6, =, Daily, THUNG, VUOT, Weekly
```ts
let change6 = "";
          let day28 = "";
          let left = "";
          let right = "";
          switch (tieuChi.leftIndexValue) {
            case 0:
              left = "Tenkan";
              break;
            case 1:
              left = "Kijun";
              break;
            default:
              break;
          }
          switch (tieuChi.rightIndexValue) {
            case 0:
              right = "Tenkan";
              break;
            case 1:
              right = "Kijun";
              break;

            default:
              break;
          }
          switch (tieuChi.compare) {
            case 0:
              change6 = "VUOT";
              break;
            case 1:
              change6 = "THUNG";
              break;
            default:
              break;
          }

          switch (tieuChi.interval) {
            case 0:
              day28 = "Daily";
              break;
            case 1:
              day28 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`${left}_${change6}_${right}_${day28}`);
          break;
```

## MACD so với Signal

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, 10, 30, <=, =, >=, Daily, MACD, MACDSignal, Weekly
```ts
let checkCompare10 = "";
          let day30 = "";

          switch (tieuChi.compare) {
            case 0:
              checkCompare10 = ">=";
              break;
            case 1:
              checkCompare10 = "=";
              break;

            case 2:
              checkCompare10 = "<=";
              break;
            default:
              break;
          }

          switch (tieuChi.interval) {
            case 0:
              day30 = "Daily";
              break;
            case 1:
              day30 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`MACD_${checkCompare10}_MACDSignal_${day30}`);
          break;
```

## MACD cắt với Signal

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, =, Daily, MACD, MACDSignal, THUNG, VUOT, Weekly
```ts
let change7 = "";
          let day31 = "";

          switch (tieuChi.compare) {
            case 0:
              change7 = "VUOT";
              break;
            case 1:
              change7 = "THUNG";
              break;
            default:
              break;
          }

          switch (tieuChi.interval) {
            case 0:
              day31 = "Daily";
              break;
            case 1:
              day31 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`MACD_${change7}_MACDSignal_${day31}`);
          break;
```

## Trạng thái giá trị của MACD

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, =, >=, Daily, MACD, MACDSignal, THUNG, VUOT, Weekly
```ts
let checkCompare11 = "";
          let day32 = "";
          let left1 = "";
          switch (tieuChi.compare) {
            case 0:
              checkCompare11 = ">=_0";
              break;
            case 1:
              checkCompare11 = "<_0";
              break;
            case 2:
              checkCompare11 = "VUOT_0";
              break;
            case 3:
              checkCompare11 = "THUNG_0";
              break;

            default:
              break;
          }
          switch (tieuChi.leftIndexValue) {
            case 0:
              left1 = "MACD";
              break;
            case 1:
              left1 = "MACDSignal";
              break;

            default:
              break;
          }
          switch (tieuChi.interval) {
            case 0:
              day32 = "Daily";
              break;
            case 1:
              day32 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`${left1}_${checkCompare11}_${day32}`);
          break;
```

## Histogram tăng liên tục

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, 6, =, Daily, MACD, UP, Weekly
```ts
const slider6 = tieuChi.rightIndexValue;
          let day34 = "";
          switch (tieuChi.interval) {
            case 0:
              day34 = "Daily";
              break;
            case 1:
              day34 = "Weekly";
              break;

            default:
              break;
          }

          faKeys.push(`MACDHist_UP_${slider6}_${day34}`);

          break;
```

## Histogram giảm liên tục

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, =, DOWN, Daily, MACD, Weekly
```ts
const slider7 = tieuChi.rightIndexValue;
          let day35 = "";
          switch (tieuChi.interval) {
            case 0:
              day35 = "Daily";
              break;
            case 1:
              day35 = "Weekly";
              break;

            default:
              break;
          }

          faKeys.push(`MACDHist_DOWN_${slider7}_${day35}`);

          break;
```

## Giá trị RSI14

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, 14, =, Daily, Weekly
```ts
let day36 = "";
          switch (tieuChi.interval) {
            case 0:
              day36 = "Daily";
              break;
            case 1:
              day36 = "Weekly";
              break;

            default:
              break;
          }
          fAFilterSub.push({
            key: `RSI14_${day36}`,
            value: {
              min: tieuChi.rightIndexValue[0].toString(),
              max: tieuChi.rightIndexValue[1].toString(),
            },
          });
          break;
```

## RSI14 so với các vùng giá trị

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, 14, 30, 40, 60, 70, <=, =, >=, Daily, Weekly
```ts
let checkCompare12 = "";
          let day37 = "";
          let right3 = "";
          switch (tieuChi.compare) {
            case 0:
              checkCompare12 = ">=";
              break;
            case 1:
              checkCompare12 = "=";
              break;

            case 2:
              checkCompare12 = "<=";
              break;
            default:
              break;
          }
          switch (tieuChi.rightIndexValue) {
            case 0:
              right3 = "70";
              break;
            case 1:
              right3 = "60";
              break;
            case 2:
              right3 = "40";
              break;
            case 3:
              right3 = "30";
              break;

            default:
              break;
          }
          switch (tieuChi.interval) {
            case 0:
              day37 = "Daily";
              break;
            case 1:
              day37 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`RSI14_${checkCompare12}_${right3}_${day37}`);
          break;
```

## RSI14 và vùng Quá mua/Quá bán

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, 14, 30, 70, =, Daily, THUNG, VUOT, Weekly
```ts
let left2 = "";
          let day38 = "";
          let right2 = "";
          switch (tieuChi.compare) {
            case 0:
              left2 = "VUOT";
              break;
            case 1:
              left2 = "THUNG";
              break;

            default:
              break;
          }
          switch (tieuChi.rightIndexValue) {
            case 0:
              right2 = "70";
              break;
            case 1:
              right2 = "30";
              break;
            default:
              break;
          }
          switch (tieuChi.interval) {
            case 0:
              day38 = "Daily";
              break;
            case 1:
              day38 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`RSI14_${left2}_${right2}_${day38}`);
          break;
```

## Giá tăng vượt Biên trên

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, =, Daily, VUOT, Weekly
```ts
let day39 = "";

          switch (tieuChi.interval) {
            case 0:
              day39 = "Daily";
              break;
            case 1:
              day39 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`CLOSE_VUOT_UpperBand_${day39}`);
          break;
```

## Giá giảm qua Biên trên

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, 40, =, Daily, THUNG, Weekly
```ts
let day40 = "";

          switch (tieuChi.interval) {
            case 0:
              day40 = "Daily";
              break;
            case 1:
              day40 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`CLOSE_THUNG_UpperBand_${day40}`);
          break;
```

## Giá giảm thủng Biên dưới

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, =, Daily, THUNG, Weekly
```ts
let day41 = "";

          switch (tieuChi.interval) {
            case 0:
              day41 = "Daily";
              break;
            case 1:
              day41 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`CLOSE_THUNG_LowerBand_${day41}`);
          break;
```

## Giá tăng qua Biên dưới

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, =, Daily, VUOT, Weekly
```ts
let day42 = "";

          switch (tieuChi.interval) {
            case 0:
              day42 = "Daily";
              break;
            case 1:
              day42 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`CLOSE_VUOT_LowerBand_${day42}`);
          break;
```

## Giá duy trì vượt ngoài Biên trên Bollinger

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, =, Daily, UP, Weekly
```ts
const slider8 = tieuChi.rightIndexValue;
          let day43 = "";
          switch (tieuChi.interval) {
            case 0:
              day43 = "Daily";
              break;
            case 1:
              day43 = "Weekly";
              break;

            default:
              break;
          }

          faKeys.push(`Close_UP_${slider8}_${day43}_UpperBand`);

          break;
```

## Giá duy trì ngoài Biên dưới Bollinger

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, =, DOWN, Daily, Weekly
```ts
const slider9 = tieuChi.rightIndexValue;
          let day44 = "";
          switch (tieuChi.interval) {
            case 0:
              day44 = "Daily";
              break;
            case 1:
              day44 = "Weekly";
              break;

            default:
              break;
          }

          faKeys.push(`Close_DOWN_${slider9}_${day44}_LowerBand`);

          break;
```

## Giá trị MFI(20)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, =, Daily, Weekly
```ts
let day45 = "";
          switch (tieuChi.interval) {
            case 0:
              day45 = "Daily";
              break;
            case 1:
              day45 = "Weekly";
              break;

            default:
              break;
          }
          fAFilterSub.push({
            key: `MFI_${day45}`,
            value: {
              min: tieuChi.rightIndexValue[0].toString(),
              max: tieuChi.rightIndexValue[1].toString(),
            },
          });
          break;
```

## MFI(20) và vùng Quá mua/Quá bán

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, 30, 70, =, Daily, THUNG, VUOT, Weekly
```ts
let change8 = "";
          let day46 = "";
          let right4 = "";
          switch (tieuChi.rightIndexValue) {
            case 0:
              right4 = "70";
              break;
            case 1:
              right4 = "30";
              break;
            default:
              break;
          }
          switch (tieuChi.compare) {
            case 0:
              change8 = "VUOT";
              break;
            case 1:
              change8 = "THUNG";
              break;
            default:
              break;
          }

          switch (tieuChi.interval) {
            case 0:
              day46 = "Daily";
              break;
            case 1:
              day46 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`MFI_${change8}_${right4}_${day46}`);
          break;
```

## Stochastic và vùng Quá mua/Quá bán

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, 20, =, Daily, THUNG, VUOT, Weekly
```ts
let change9 = "";
          let day47 = "";
          let right5 = "";
          let left5 = "";
          switch (tieuChi.leftIndexValue) {
            case 0:
              left5 = "StochSlowK";
              break;
            case 1:
              left5 = "StochSlowD";
              break;
            default:
              break;
          }
          switch (tieuChi.rightIndexValue) {
            case 0:
              right5 = "80";
              break;
            case 1:
              right5 = "20";
              break;
            default:
              break;
          }
          switch (tieuChi.compare) {
            case 0:
              change9 = "VUOT";
              break;
            case 1:
              change9 = "THUNG";
              break;
            default:
              break;
          }

          switch (tieuChi.interval) {
            case 0:
              day47 = "Daily";
              break;
            case 1:
              day47 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`${left5}_${change9}_${right5}_${day47}`);
          break;
```

## Stochastic giao cắt nhau

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, 10, =, Daily, THUNG, VUOT, Weekly
```ts
let change10 = "";
          let day48 = "";

          switch (tieuChi.compare) {
            case 0:
              change10 = "VUOT";
              break;
            case 1:
              change10 = "THUNG";
              break;
            default:
              break;
          }

          switch (tieuChi.interval) {
            case 0:
              day48 = "Daily";
              break;
            case 1:
              day48 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`faKeysStochSlowK_${change10}_StochSlowD_${day48}`);
          break;
```

## Giá trị MCDX (Banker)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, =, Daily, Weekly
```ts
let day49 = "";
          switch (tieuChi.interval) {
            case 0:
              day49 = "Daily";
              break;
            case 1:
              day49 = "Weekly";
              break;

            default:
              break;
          }
          fAFilterSub.push({
            key: `MCDXBanker_${day49}`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## Giá trị MCDX (Hot money)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, 50, =, Daily, Weekly
```ts
let day50 = "";
          switch (tieuChi.interval) {
            case 0:
              day50 = "Daily";
              break;
            case 1:
              day50 = "Weekly";
              break;

            default:
              break;
          }
          fAFilterSub.push({
            key: `MCDXHotMoney_${day50}`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## Biến động MCDX

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, 20, 30, 40, 50, 6, 60, 70, =, Daily, THUNG, VUOT, Weekly
```ts
let change11 = "";
          let day51 = "";
          let right6 = "";
          let left6 = "";
          switch (tieuChi.leftIndexValue) {
            case 0:
              left6 = "MCDXBanker";
              break;
            case 1:
              left6 = "MCDXHotMoney";
              break;
            default:
              break;
          }
          switch (tieuChi.rightIndexValue) {
            case 0:
              right6 = "20";
              break;
            case 1:
              right6 = "25";
              break;
            case 2:
              right6 = "30";
              break;
            case 3:
              right6 = "40";
              break;
            case 4:
              right6 = "50";
              break;
            case 5:
              right6 = "60";
              break;
            case 6:
              right6 = "70";
              break;
            case 7:
              right6 = "75";
              break;
            case 8:
              right6 = "80";
              break;
            default:
              break;
          }
          switch (tieuChi.compare) {
            case 0:
              change11 = "VUOT";
              break;
            case 1:
              change11 = "THUNG";
              break;
            default:
              break;
          }

          switch (tieuChi.interval) {
            case 0:
              day51 = "Daily";
              break;
            case 1:
              day51 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`${left6}_${change11}_${right6}_${day51}`);
          break;
```

## Giá trị ADX(14)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, 52, =, Daily, Weekly
```ts
let day52 = "";
          switch (tieuChi.interval) {
            case 0:
              day52 = "Daily";
              break;
            case 1:
              day52 = "Weekly";
              break;

            default:
              break;
          }
          fAFilterSub.push({
            key: `ADX_${day52}`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## Giá trị -DI(14)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, 14, =, Daily, Weekly
```ts
let day53 = "";
          switch (tieuChi.interval) {
            case 0:
              day53 = "Daily";
              break;
            case 1:
              day53 = "Weekly";
              break;

            default:
              break;
          }
          fAFilterSub.push({
            key: `DIN14_${day53}`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## Giá trị +DI(14)

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, 14, =, Daily, Weekly
```ts
let day54 = "";
          switch (tieuChi.interval) {
            case 0:
              day54 = "Daily";
              break;
            case 1:
              day54 = "Weekly";
              break;

            default:
              break;
          }
          fAFilterSub.push({
            key: `DIP14_${day54}`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## Giao cắt nhóm ADX

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, 14, =, Daily, THUNG, VUOT, Weekly
```ts
let change12 = "";
          let day55 = "";
          let right7 = "";
          let left7 = "";
          switch (tieuChi.leftIndexValue) {
            case 0:
              left7 = "DIP14";
              break;
            case 1:
              left7 = "DIN14";
              break;
            case 2:
              left7 = "ADX";
              break;
            default:
              break;
          }
          switch (tieuChi.rightIndexValue) {
            case 0:
              right7 = "DIP14";
              break;
            case 1:
              right7 = "DIN14";
              break;
            case 2:
              right7 = "ADX";
              break;

            default:
              break;
          }
          switch (tieuChi.compare) {
            case 0:
              change12 = "VUOT";
              break;
            case 1:
              change12 = "THUNG";
              break;
            default:
              break;
          }

          switch (tieuChi.interval) {
            case 0:
              day55 = "Daily";
              break;
            case 1:
              day55 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`${left7}_${change12}_${right7}_${day55}`);
          break;
```

## ADX và ngưỡng giá trị

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, 10, 14, 20, 30, 40, 50, 6, 60, 70, <=, =, >=, Daily, Weekly
```ts
let change13 = "";
          let day56 = "";
          let right8 = "";
          let left8 = "";
          switch (tieuChi.leftIndexValue) {
            case 0:
              left8 = "ADX";
              break;
            case 1:
              left8 = "DIP14";
              break;
            case 2:
              left8 = "DIN14";
              break;
            default:
              break;
          }
          switch (tieuChi.rightIndexValue) {
            case 0:
              right8 = "20";
              break;
            case 1:
              right8 = "25";
              break;
            case 2:
              right8 = "30";
              break;
            case 3:
              right8 = "35";
              break;
            case 4:
              right8 = "40";
              break;
            case 5:
              right8 = "45";
              break;
            case 6:
              right8 = "50";
              break;
            case 7:
              right8 = "55";
              break;
            case 8:
              right8 = "60";
              break;
            case 9:
              right8 = "65";
              break;
            case 10:
              right8 = "70";
              break;
            default:
              break;
          }
          switch (tieuChi.compare) {
            case 0:
              change13 = ">=";
              break;
            case 1:
              change13 = "=";
              break;

            case 2:
              change13 = "<=";
              break;
            default:
              break;
          }

          switch (tieuChi.interval) {
            case 0:
              day56 = "Daily";
              break;
            case 1:
              day56 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`${left8}_${change13}_${right8}_${day56}`);
          break;
```

## Giá so với PSar

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, 14, <=, =, >=, Daily, Weekly
```ts
let change14 = "";
          let day57 = "";

          switch (tieuChi.compare) {
            case 0:
              change14 = ">=";
              break;
            case 1:
              change14 = "=";
              break;

            case 2:
              change14 = "<=";
              break;
            default:
              break;
          }

          switch (tieuChi.interval) {
            case 0:
              day57 = "Daily";
              break;
            case 1:
              day57 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`CLOSE_${change14}_PSar_${day57}`);
          break;
```

## Khoảng cách giá và PSar

- **Destination:** N/A
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, =, Daily, Weekly
```ts
let day58 = "";
          switch (tieuChi.interval) {
            case 0:
              day58 = "Daily";
              break;
            case 1:
              day58 = "Weekly";
              break;

            default:
              break;
          }
          fAFilterSub.push({
            key: `CloseVsPSARMUTATION_${day58}`,
            value: {
              min: ConvertStringToNumber(tieuChi.rightIndexValue[0]).toString(),
              max: ConvertStringToNumber(tieuChi.rightIndexValue[1]).toString(),
            },
          });
          break;
```

## PSar đảo chiều

- **Destination:** faKeys
- **Control guess:** select
- **Has timeframe:** yes
- **Tokens seen:** 0, 10, 14, 20, 30, 50, 6, =, >=, Daily, THUNG, UP, VUOT, Weekly
```ts
let change16 = "";
          let day59 = "";

          switch (tieuChi.compare) {
            case 0:
              change16 = "VUOT";
              break;
            case 1:
              change16 = "THUNG";
              break;

            default:
              break;
          }

          switch (tieuChi.interval) {
            case 0:
              day59 = "Daily";
              break;
            case 1:
              day59 = "Weekly";
              break;

            default:
              break;
          }
          faKeys.push(`CLOSE_${change16}_PSar_${day59}`);
          break;
        default:
          break;
      }
    }
    const fAFilterSubObj = fAFilterSub.reduce((obj: any, item) => {
      obj[item.key] = item.value;
      return obj;
    }, {});
    const booleanFilterObj = booleanFilter.reduce((obj: any, item) => {
      obj[item.key] = item.value;
      return obj;
    }, {});
    const fAFilterObj = faFilter.reduce((obj: any, item) => {
      obj[item.key] = item.value;
      return obj;
    }, {});
    const faKeysObj = faKeys;
    const parametersFin = parameters;
    const object = {
      faFilter: fAFilterObj,
      taFilter: null,
      booleanFilter: booleanFilterObj,
      pageNumber: 1,
      pageSize: 10000,
      exchanges: ["HSX", "HNX", "UPCOM"],
      icbCodes: null,
      sortColumn: "Symbol",
      isDesc: false,
      fAFilterSub: fAFilterSubObj,
      faKeys: faKeysObj,
      wlOrPId: null,
      tradingTime: null,
    };
    const objectFin = {
      comGroupCode: "All",
      icbCode: "All",
      parameters: parametersFin,
      page: pageTable,
      pageSize: pageSize,
      OrderBy: "StockScreenerItem.Ticker",
      Direction: "ASC",
    };
    const listMatched: any = await axios.post(
      `${config.app.VITE_APP_API_URL}/filter-data`,
      // `${config.app.VITE_APP_API_URL}/filter-data`,
      object
    );
    // const listFinRes: any = await axios.post(
    //   `${config.app.VITE_APP_API_URL}/filter-data-new`,
    //   // 'https://fiin-tools.ssi.com.vn/Screener/GetScreenerItems',
    //   objectFin
    // );

    const listMatchedMap = listMatched?.data?.data?.result?.items?.map(
      (item: any, index: any) => {
        return {
          ...item,
          id: index + 1,
          stt: index + 1,
        };
      }
    );
    if (listMatched.status === 200) {
      // setLoading(false);
    }
    setTotalFin(listMatched?.data.data.result.totalCount);
    // const listSymbolFinMap = listFinRes?.data?.items?.map(
    //   (item: any, index: any) => {
    //     return item?.financial?.organCode;
    //   }
    // );

    // const finalList = listMatchedMap.filter((item: any, index: any) => {
    //   return listSymbolFinMap?.includes(item?.Symbol);
    // });
    const listTieuChiPickedFin = listTieuChiPicked.filter((item: any) => {
      return item.finNew;
    });

    if (listTieuChiPickedFin.length > 0) {
      setTotalResult(listFinRes?.data.totalCount);
      const listNhomNganh = await axios.post(
        `${config.app.VITE_APP_API_URL}/nhom-nganh`,
        {
          symbols: listMatchedMap.map((item: any) => item.Symbol),
        }
      );

      const listNhomNganhMap = listNhomNganh?.data?.data?.map((item: any) => {
        return {
          // ...item,
          Symbol: item?.symbol,
          superSector: item?.superSector,
          exchange: item?.exchange,
        };
      });
      const map = new Map(
        listNhomNganhMap?.map((obj: any) => [obj?.Symbol, obj])
      );

      // Merge the arrays
      const mergedArray = finalList?.map((row: any) => {
        return { ...row, ...map.get(row?.Symbol) };
      });

      localStorage.setItem("filterData", JSON.stringify(mergedArray));

      setRows(mergedArray);
      setLoading(false);

      // setRows(finalList);
    } else if (listTieuChiPicked) {
      setTotalResult(listMatched?.data?.data?.result?.totalCount);
      const listNhomNganh = await axios.post(
        `${config.app.VITE_APP_API_URL}/nhom-nganh`,
        {
          symbols: listMatchedMap?.map((item: any) => item.Symbol),
        }
      );

      const listNhomNganhMap = listNhomNganh?.data?.data?.map((item: any) => {
        return {
          // ...item,
          Symbol: item?.symbol,
          superSector: item?.superSector,
          exchange: item?.exchange,
        };
      });
      const map = new Map(
        listNhomNganhMap?.map((obj: any) => [obj?.Symbol, obj])
      );

      // Merge the arrays
      const mergedArray = listMatchedMap?.map((row: any) => {
        return { ...row, ...map.get(row?.Symbol) };
      });

      if (listMatched?.data?.data?.result?.totalCount === 1150)
        localStorage.setItem("filterData", JSON.stringify(mergedArray));

      setRows(mergedArray);
      // setRows(listMatchedMap);
      setLoading(false);
    }
    setLoading(false);

    if (listMatchedMap?.length > 0) {
      const listKey = Object.keys(listMatchedMap[0]);
    }

    const listPayloadColumn = listTieuChiPicked
      .filter((item: any, index: any) => {
        return item?.compareList[0] === "range";
      })
      .slice(0, 4)
      .map((item: any, index: any) => {
        return item;
      });

    let listColumnMap = listPayloadColumn?.map((item: any, index: any) => {
      const dataIndex = item?.sessionListNumber
        ? `${item?.responseKey}_${item?.sessionListNumber[item?.session]}`
        : `${item?.responseKey}`;
      if (dataIndex) {
        return {
          ...item,
          title: item.label,
          dataIndex: dataIndex,
          width: "3%",
          backgroundColor: "black",
          editable: true,
        };
      } else {
        return null;
      }
    });
    listColumnMap = listColumnMap.filter((item: any) => {
      return !item?.finNew;
    });

    const newColumns = [
      ...[
        {
          title: "#",
          dataIndex: "key",
          width: "0.3%",
          backgroundColor: "red",
          editable: true,
        },
        {
          title: "MÃ",
          dataIndex: "Symbol",
          width: "0.3%",
          backgroundColor: "red",
          editable: true,
        },
        {
          title: "Sàn CK",
          dataIndex: "exchange",
          width: "1%",
          backgroundColor: "red",
          editable: true,
        },
      ],
      ...listColumnMap,
      {
        title: "Nhóm ngành",
        dataIndex: "superSector",
        width: "5%",
        backgroundColor: "red",
        editable: true,
      },
      // Sử dụng toán tử ba ngôi để kiểm tra điều kiện và thêm cột, hoặc trả về null nếu điều kiện không thoả mãn
      tabMenuTarget === "setting"
        ? {
            title: "Thông báo",
            dataIndex: "notification", // Đảm bảo sử dụng dataIndex phù hợp
            width: "5%",
            backgroundColor: "red",
            editable: true,
          }
        : null,
    ].filter(Boolean); // Lọc ra các giá trị falsy
    const set = new Map(newColumns.map((item) => [item.title, item]));

    const newList = Array.from(set.values());
    localStorage.setItem("filterColumns", JSON.stringify(newListMap));
    const newListMap = newList.map((item, index) => {
      let textColor;
      if (item?.title === "Sàn CK") {
        textColor = "rgba(92, 214, 128, 1)";
      }
      if (item?.title === "#") {
        textColor = "rgba(129, 132, 152, 1)";
      }
      if (item?.title === "Nhóm ngành") {
        textColor = "rgba(153, 186, 255, 1)";
      }

      if (item?.title.includes("%")) {
        // Xử lý cho trường hợp title có ký tự '%'
        return {
          ...item,
          render: (value) => {
            // Xử lý value như một giá trị phần trăm
            let valueString = ConvertNumber(value * 100) + " %";
            return <div>{valueString}</div>;
          },
        };
      } else if (
        item?.title === "MÃ" ||
        item?.title === "Nhóm ngành" ||
        item?.title === "#" ||
        item?.title === "Sàn CK"
      ) {
        // Xử lý cho các trường hợp khác
        return {
          ...item,
          render: (value, record, index) => {
            return (
              <div>
                {item?.title === "MÃ" ? (
                  <a>{value}</a>
                ) : item?.title === "#" ? (
                  <div style={{ color: "rgba(129, 132, 152, 1) !important" }}>
                    {value}
                  </div>
                ) : (
                  <div style={{ color: textColor }}>{value}</div>
                )}
              </div>
            );
          },
        };
      } else {
        // Xử lý mặc định
        return {
          ...item,
          render: (value) => {
            let valueString = ConvertNumber(value);
            return <div>{valueString}</div>;
          },
        };
      }
    });
    setColumns(newListMap);

    handleCloseLoading();
  };

  // const columnsMap = [
  //   ...columns,
  //   {
  //     title: '',
  //     dataIndex: 'empty',
  //     key: 'empty',
  //     align: 'left',
  //     render: (text: any, record: any) => {
  //       return {
  //         props: {
  //           style: { background: record.stt % 2 === 0 && '#1D1F2A' },
  //         },
  //         children: <div></div>,
  //       };
  //     },
  //   },
  // ];
  // useEffect(() => {
  //   axios
  //     .get(`${config.app.VITE_APP_API_URL}/user-config-share-requests`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       setListIdConfig((prev) => [...prev, res.data.config.userID]);
  //     });
  // }, []);

  const code = useSelector((state) => state.search.code);
  const [isTablePriceTab, setIsTablePriceTab] = useState(false);

  const onChangeTablePriceTab = () => {
    setIsTablePriceTab(!isTablePriceTab);
  };
  const [listSignal, setListSignal] = useState([]);
  const [listChiTieu, setListChiTieu] = useState([]);

  const [listTabs, setListTabs] = useState([
    {
      symbol: "SSI",
      resolution: "1D",
      isPicked: true,
      isHover: false,
    },
    {
      symbol: "ABC",
      resolution: "2D",
      isPicked: false,
      isHover: false,
    },
    {
      symbol: "VNM",
      resolution: "1D",
      isPicked: false,
      isHover: false,
    },
  ]);

  const [curTab, setCurTab] = useState(listTabs[0]);

  const [trendingLine, setTrendingLine] = useState([]);
  const [commonIndicator, setCommonIndicator] = useState([]);
  const [priceUp, setPriceUp] = useState(0);
  const [priceDown, setPriceDown] = useState(0);

  const [sharingSignal, setSharingSignal] = useState<any>(null);
  const [checkBox, setCheckBox] = useState(false);
  const [listMatch, setListMatch] = useState<any>([]);
  const [activeTab, setActiveTab] = useState("thongTin");
  const [tableTarget, setTableTarget] = useState<any>(false);
  let [symbolInfo, setSymbolInfo] = useState({});
  let [lastOrder, setLastOrder] = useState({});
  const { user } = useAppSelector((state: RootState) => state.app);

  let [symbolTongHopInfo, setSymbolTongHopInfo] = useState({});
  let [listMatchOrder, setListMatchOrder] = useState([]);
  let [totalBuyVol, setTotalBuyVol] = useState(0);
  const [accountInfo, setAccountInfo] = useState<any>([]);
  const [balance, setBalance] = useState<any>();
  const [category, setListCategory] = useState<any>([]);
  let [totalSellVol, setTotalSellVol] = useState(0);
  let [totalVol, setTotalVol] = useState(0);
  const [previousValues, setPreviousValues] = useState({
    BidVol1: null,
    AskVol1: null,
    BidVol2: null,
    AskVol2: null,
    BidVol3: null,
    AskVol3: null,
    LastPrice: null,
    Change: null,
    RatioChange: null,
    Symbol: null,
    TotalVol: null,
    TotalBuyVol: null,
    TotalSellVol: null,
    // ... add more as needed
  });
  const [date, setDate] = useState<any>(new Date());
  let [isFloor, setIsFloor] = useState(false);
  let [isCeiling, setIsCeiling] = useState(false);
  const [bgColors, setBgColors] = useState({
    BidVol1: "transparent",
    AskVol1: "transparent",
    BidVol2: "transparent",
    AskVol2: "transparent",
    BidVol3: "transparent",
    AskVol3: "transparent",
    BidVol4: "transparent",
    AskVol4: "transparent",
    BidVol5: "transparent",
    AskVol5: "transparent",
    BidVol6: "transparent",
    AskVol6: "transparent",
    LastPrice: "transparent",
    Change: "transparent",
    RatioChange: "transparent",
    TotalVol: "transparent",
    TotalBuyVol: "transparent",
    TotalSellVol: "transparent",
    // ... add more as needed
  });
  let [curSection, setCurSection] = useState("chiTiet");

  const location = useLocation();
  const activeTabProps = location?.state?.activeTab || {}; // Defaulting to an empty object if state is undefined

  useEffect(() => {
    if (activeTabProps === "congCu") {
      setTabMenuTarget("congcu");
    }
  }, [activeTabProps]);

  useEffect(() => {
    let newBgColors = { ...bgColors };
    let hasChanged = false;

    for (let key in previousValues) {
      if (!lastOrder) continue;
      if (!previousValues) continue;
      if (
        lastOrder[key] !== previousValues[key] &&
        lastOrder?.symbol === previousValues?.Symbol
      ) {
        newBgColors[key] = "#d3a43f";
        hasChanged = true;
      }
      if (key === "TotalBuyVol" && lastOrder?.type === "B") {
        newBgColors[key] = "#d3a43f";
      }
      if (key === "TotalSellVol" && lastOrder?.type === "S") {
        newBgColors[key] = "#d3a43f";
      }
    }

    if (hasChanged) {
      setPreviousValues((prevPreviousValues) => {
        return {
          ...prevPreviousValues,
          BidVol1: lastOrder?.BidVol1,
          AskVol1: lastOrder?.AskVol1,
          BidVol2: lastOrder?.BidVol2,
          AskVol2: lastOrder?.AskVol2,
          BidVol3: lastOrder?.BidVol3,
          AskVol3: lastOrder?.AskVol3,
          BidVol4: lastOrder?.BidVol4,
          AskVol4: lastOrder?.AskVol4,
          BidVol5: lastOrder?.BidVol5,
          AskVol5: lastOrder?.AskVol5,
          BidVol6: lastOrder?.BidVol6,
          AskVol6: lastOrder?.AskVol6,
          LastPrice: lastOrder?.LastPrice,
          Change: lastOrder?.Change,
          RatioChange: lastOrder?.RatioChange,
          Symbol: lastOrder?.symbol,
          TotalVol: lastOrder?.TotalVol,
          TotalBuyVol: lastOrder?.TotalBuyVol,
          TotalSellVol: lastOrder?.TotalSellVol,

          // ... add more as needed
        };
      });
      setBgColors(newBgColors);

      const timer = setTimeout(() => {
        setBgColors({
          BidVol1: "transparent",
          AskVol1: "transparent",
          BidVol2: "transparent",
          AskVol2: "transparent",
          BidVol3: "transparent",
          AskVol3: "transparent",
          LastPrice: "transparent",
          Change: "transparent",
          RatioChange: "transparent",
          // ... add more as needed
        });
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    } else {
      setPreviousValues((prevPreviousValues) => {
        return {
          ...prevPreviousValues,
          Symbol: lastOrder?.symbol,
        };
      });
    }
  }, [lastOrder]);
  const token = localStorage.getItem("token");

  // useEffect(() => {
  //   axios
  //     .get(`${config.app.VITE_APP_API_URL}/getAccountInfo`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       setAccountInfo(res.data);
  //       setBalance(res.data.balance);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching account info:', error);
  //     });
  // }, []);

  // useEffect(() => {
  //   getPortfolio();
  // }, []);

  const getPortfolio = () => {
    axios
      .get(`${config.app.VITE_APP_API_URL}/getPortfolio`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setListCategory(res.data.holdings);
      })
      .catch((error) => {
        console.error("Error fetching account info:", error);
      });
  };
  // useEffect(() => {
  //   if (tabMenuTarget === 'congcu') {
  //     if (curTab?.symbol !== 'VNINDEX') {
  //       axios
  //         .get(
  //           `${config.app.VITE_APP_API_URL}/symbol_info?query=${curTab.symbol}`
  //         )
  //         .then((res) => {
  //           setSymbolInfo(res?.data[0]);
  //         });
  //       // axios
  //       //   .get(
  //       //     `${config.app.VITE_APP_API_URL}/mua_ban_chu_dong?symbol=${curTab.symbol}`
  //       //   )
  //       //   .then((res) => {
  //       //     let removeZeroPrice = res?.data?.data?.filter((item) => {
  //       //       return item?.LastPrice !== 0;
  //       //     });
  //       //     // setListMatchOrder(removeZeroPrice);
  //       //     // setLastOrder(res?.data?.data[0]);
  //       //   });

  //       axios
  //         .get(
  //           `${config.app.VITE_APP_API_URL}/mua_ban_chu_dong_short?symbol=${curTab.symbol}`
  //         )
  //         .then((res) => {
  //           // let removeZeroPrice = res?.data?.data?.filter((item) => {
  //           //   return item?.LastPrice !== 0;
  //           // });
  //           // let totalVol = sumBy(res?.data?.data, 'LastVol');
  //           let totalVol = res?.data?.data[0]?.TotalVol;
  //           let totalBuyVol = res?.data?.data[0]?.TotalBuyVol;
  //           let totalSellVol = res?.data?.data[0]?.TotalSellVol;

  //           // let totalBuyVol = sumBy(
  //           //   res?.data?.data?.filter((item: any, index: number) => {
  //           //     return item?.type === 'B';
  //           //   }),
  //           //   'LastVol'
  //           // );
  //           // let totalSellVol =
  //           setListMatchOrder(res?.data?.data);
  //           setTotalBuyVol(totalBuyVol);
  //           setTotalSellVol(totalSellVol);
  //           setTotalVol(totalVol);
  //           setLastOrder(res?.data?.data[0]);
  //           setPreviousValues((prevPreviousValues) => {
  //             return {
  //               ...prevPreviousValues,
  //               TotalBuyVol: totalBuyVol,
  //               TotalSellVol: totalSellVol,
  //             };
  //           });
  //         });

  //       axios
  //         .get(
  //           `${config.app.VITE_APP_API_URL}/DailyStockPrice?symbol=${
  //             curTab.symbol
  //           }&fromDate=${convertDateMin(date)}&toDate=${convertDate(date)}`
  //         )
  //         .then((res) => {
  //           let info = res?.data?.data?.pop();

  //           let totalBuyVol = info?.stockBUVol;
  //           let totalSellVol = info?.stockSDVol;
  //           let lastOrderNew = {
  //             symbol: info?.Symbol,
  //             Ceiling: info?.CeilingPrice,
  //             Floor: info?.FloorPrice,
  //             RefPrice: info?.RefPrice,
  //             AvgPrice: info?.AveragePrice,
  //             PriorVal: '',
  //             LastPrice: info?.ClosePrice,
  //             LastVol: info?.TotalTradedVol,
  //             TotalVal: info?.TotalMatchVal,
  //             TotalVol: info?.TotalMatchVol,
  //             BidPrice1: '',
  //             BidPrice2: '',
  //             BidPrice3: '',
  //             BidVol1: '',
  //             BidVol2: '',
  //             BidVol3: '',
  //             AskPrice1: '',
  //             AskPrice2: '',
  //             AskPrice3: '',
  //             AskVol1: '',
  //             AskVol2: '',
  //             AskVol3: '',
  //             MarketId: '',
  //             Exchange: '',
  //             Change: info?.PriceChange,
  //             RatioChange: info?.PerPriceChange,
  //             type: 'B',
  //             highest: info?.HighestPrice,
  //             lowest: info?.LowestPrice,
  //             openPrice: info?.OpenPrice,
  //             ThiGiaVon: '',
  //             GiaTri: info?.TotalTradedValue,
  //             KhoiLuong: info?.TotalTradedVol,
  //             SoLuongCPLH: '',
  //             KhoiLuongMuaNuocNgoai: info?.ForeignBuyVolTotal,
  //             KhoiLuongBanNuocNgoai: info?.ForeignSellVolTotal,

  //             GiaTrungBinh: info?.AveragePrice,
  //           };
  //           // setLastOrder(lastOrderNew);
  //           setSymbolTongHopInfo(lastOrderNew);
  //           // setTotalBuyVol(totalBuyVol);
  //           // setTotalSellVol(totalSellVol);
  //           setPreviousValues((prevPreviousValues) => {
  //             return {
  //               ...prevPreviousValues,
  //               TotalBuyVol: totalBuyVol,
  //               TotalSellVol: totalSellVol,
  //             };
  //           });
  //         })
  //         .catch((err) => {});
  //     } else {
  //       setSymbolInfo({
  //         symbol: 'VNINDEX',
  //         full_name: 'VNINDEX',
  //         description: 'VNINDEX',
  //         exchange: '',
  //         type: 'index',
  //         exchange_logo:
  //           'https://s3-symbol-logo.tradingview.com/country/US.svg',
  //       });
  //       let lastOrderNew = {
  //         symbol: 'VNINDEX',
  //         Ceiling: '',
  //         Floor: '',
  //         RefPrice: '',
  //         AvgPrice: '',
  //         PriorVal: '',
  //         LastPrice: '',
  //         LastVol: '',
  //         TotalVal: '',
  //         TotalVol: '',
  //         BidPrice1: '',
  //         BidPrice2: '',
  //         BidPrice3: '',
  //         BidVol1: '',
  //         BidVol2: '',
  //         BidVol3: '',
  //         AskPrice1: '',
  //         AskPrice2: '',
  //         AskPrice3: '',
  //         AskVol1: '',
  //         AskVol2: '',
  //         AskVol3: '',
  //         MarketId: '',
  //         Exchange: '',
  //         Change: '',
  //         RatioChange: '',
  //         type: '',
  //         highest: '',
  //         lowest: '',
  //         openPrice: '',
  //         ThiGiaVon: '',
  //         GiaTri: '',
  //         KhoiLuong: '',
  //         SoLuongCPLH: '',
  //         KhoiLuongMuaNuocNgoai: '',
  //         KhoiLuongBanNuocNgoai: '',
  //         GiaTriMuaNuocNgoai: '',
  //         GiaTriBanNuocNgoai: '',
  //         GiaTrungBinh: '',
  //       };
  //       setListMatchOrder([]);
  //       setLastOrder(lastOrderNew);
  //       setSymbolTongHopInfo(lastOrderNew);
  //       setTotalBuyVol('');
  //       setTotalSellVol('');
  //     }
  //   }
  // }, [curTab?.symbol]);

  // if (lastOrder?.Floor === lastOrder?.LastPrice) {
  //   isFloor = true;
  // } else {
  //   isFloor = false;
  // }

  // if (lastOrder?.Ceiling === lastOrder?.LastPrice) {
  //   isCeiling = true;
  // } else {
  //   isCeiling = false;
  // }

  const openNotification = (chartInfo: any) => {
    api.info({
      message: `Thông báo chia sẻ biểu đồ`,
      description: `${chartInfo[1]?.name} đã chia sẻ 1 biểu đồ cho bạn !!!`,
      placement: "topRight",
      duration: 5,
    });
  };

  useEffect(() => {
    // const ws = new WebSocket('ws://localhost:8080'); // replace widiv your server address
    const ws = new WebSocket(config.socket.VITE_REACT_APP_SOCKET_IO);

    ws.onopen = () => {
      // Send a message to the server indicating interest in a symbol
      ws.send(
        JSON.stringify({ type: "SUBSCRIBE", symbol: symbolInfo?.symbol })
      );
    };
    ws.addEventListener("message", (event) => {
      const parsedData = JSON.parse(event.data);
      if (!parsedData?.isDuplicate) {
        setListMatchOrder((prevListMatchOrder) => {
          return [parsedData, ...prevListMatchOrder];
        });
        setTotalVol(parsedData?.TotalVol);
      }

      setLastOrder(parsedData);
      if (parsedData?.type === "B") {
        setTotalBuyVol((prevTotalBuyVol) => {
          return prevTotalBuyVol + parsedData?.LastVol;
        });
      } else if (parsedData?.type === "S") {
        setTotalSellVol((prevTotalSellVol) => {
          return prevTotalSellVol + parsedData?.LastVol;
        });
      }
    });

    return () => {
      ws.close();
    };
  }, [symbolInfo]);
  let groupByLastPrice = groupBy(listMatchOrder, "LastPrice");
  let groupByLastPriceMap = Object.values(groupByLastPrice).map((item) => {
    return sumBy(item, "LastVol");
  });
  const onSaveListChiTieu = () => {
    axios
      .post(
        `${config.app.VITE_APP_API_URL}/listChiTieu/add`,
        {
          ownerId: user?.userID,
          symbol: listSymbolPicked,
          signalName: `Tín hiệu`,
          signalInfo: listTieuChi,
          // symbolNoti:listSymbolPicked
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        getListTieuChi();
      })
      .catch((error) => {
        console.error("Error saving signal:", error);
      });
  };
  const onSaveSignal = () => {
    const savedChart = localStorage.getItem("myChartDataFilter");
    if (savedChart) {
      let obj = JSON.parse(savedChart);
      const listSource = obj?.charts[0]?.panes[0]?.sources;
      let curMainSeries = listSource?.find(
        (item) => item?.type === "MainSeries"
      );
      let curSymbol = curMainSeries?.state?.symbol;
      let trendingLine = listSource.filter((item) => {
        return (
          (item.type === "LineToolTrendLine" &&
            //symbol = latestCurTab?.symbol
            item.state.symbol === curSymbol) ||
          item.state.symbol === `HOSE:${curSymbol}`
        );
      });
      obj.charts[0].panes[0].sources = trendingLine;
      const saveChartFilter = JSON.stringify(obj);
      axios
        .post(
          `${config.app.VITE_APP_API_URL}/signals/add`,
          {
            ownerId: user?.userID,
            symbol: curTab?.symbol,
            signalName: `Tín hiệu ${curTab?.symbol}`,
            signalInfo: saveChartFilter,
            // signalInfo: savedChart,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          notification.success({
            message: "Lưu tín hiệu thành cồng",
            // description:
            //   'Kẻ đường trendline và cài đặt giá thông báo cho tín hiệu',
            duration: 2,
            placement: "bottomRight",
          });
          getListSignals();
        })
        .catch((error) => {
          let errorData = error?.response?.data?.message;
          if (errorData === "Token expired") {
            notification.error({
              message: "Phiên đăng nhập hết hạn",
              description: "Vui lòng đăng nhập lại để tiếp tục sử dụng",
              duration: 2,
              placement: "bottomRight",
            });
          }
          if (errorData === "Forbidden") {
            notification.error({
              message: "Chưa đăng nhập",
              description: "Vui lòng đăng nhập để tiếp tục sử dụng",
              duration: 2,
              placement: "bottomRight",
            });
          }
          console.error("Error saving signal:", error);
        });
    }
  };
  let groupByLastPriceDetailMap = Object.values(groupByLastPrice).map(
    (item, index) => {
      let price = Object.keys(groupByLastPrice)[index];
      return {
        total: sumBy(item, "LastVol"),
        totalBuy: sumBy(
          item.filter((item: any, index: number) => {
            return item?.type === "B";
          }),
          "LastVol"
        ),
        totalSell: sumBy(
          item.filter((item: any, index: number) => {
            return item?.type === "S";
          }),
          "LastVol"
        ),
        totalATC:
          price ==
          item.find((item: any, index: number) => {
            return item?.Time.includes("14:45");
          })?.LastPrice
            ? item.find((item: any, index: number) => {
                return item?.Time.includes("14:45");
              })?.LastVol
            : 0,
        totalATO:
          price == listMatchOrder[listMatchOrder.length - 1]?.LastPrice
            ? listMatchOrder[listMatchOrder.length - 1]?.LastVol
            : 0,
        price,
      };
    }
  );

  groupByLastPriceMap = groupByLastPriceMap;

  let yAxisData = groupByLastPrice
    ? Object.keys(groupByLastPrice).map((item) => formatNumber(item))
    : [];
  while (yAxisData.length < 30) {
    yAxisData.push("");
  }

  let yAxisDataMap = yAxisData.reverse();
  // let yAxisDataMap = groupByLastPrice
  //   ? [...yAxisData, "", "", "", "", "", ""].reverse()
  //   : [];
  let seriesDataBuy = groupByLastPriceMap.map((item, index) => {
    let price = Object.keys(groupByLastPrice)[index];
    return groupByLastPriceDetailMap[index]?.totalBuy;
    // return {
    //   // value: item / 1000,

    //   value: groupByLastPriceDetailMap[index]?.totalBuy,
    //   itemStyle: {
    //     borderRadius: [4, 4, 4, 4],
    //     // color:
    //     //   +price === +lastOrder.RefPrice
    //     //     ? '#CCAA00'
    //     //     : price > lastOrder.RefPrice
    //     //       ? '#575a6a'
    //     //       : '#E43637',
    //   },
    // };
  });
  while (seriesDataBuy.length < 30) {
    seriesDataBuy.push({
      value: 0,
    });
  }

  let seriesDataSell = groupByLastPriceMap.map((item, index) => {
    let price = Object.keys(groupByLastPrice)[index];
    return groupByLastPriceDetailMap[index]?.totalSell;
  });
  while (seriesDataSell.length < 30) {
    seriesDataSell.push({
      value: 0,
    });
  }
  let seriesDataATC = groupByLastPriceMap.map((item, index) => {
    let price = Object.keys(groupByLastPrice)[index];
    return groupByLastPriceDetailMap[index]?.totalATC;
  });
  while (seriesDataATC.length < 30) {
    seriesDataATC.push({
      value: 0,
    });
  }
  let seriesDataATO = groupByLastPriceMap.map((item, index) => {
    let price = Object.keys(groupByLastPrice)[index];
    return groupByLastPriceDetailMap[index]?.totalATO;
  });
  while (seriesDataATO.length < 30) {
    seriesDataATO.push({
      value: 0,
    });
  }

  // let seriesDataMap = seriesData.reverse();
  let seriesDataMapBuy = seriesDataBuy.reverse();
  let seriesDataMapSell = seriesDataSell.reverse();
  let seriesDataMapATC = seriesDataATC.reverse();
  let seriesDataMapATO = seriesDataATO.reverse();

  let series = [
    {
      data: seriesDataMapBuy,
      type: "bar",
      stack: "a",
      emphasis: { label: { color: "red" }, scale: true },
      itemStyle: {
        color: "#575a6a",
        type: "buy",
      },
      barMinWidth: "16px", // Tăng độ rộng tối thiểu của mỗi cột
      // barMaxWidth: '20px', // Tăng độ rộng tối đa của mỗi cột
      barCategoryGap: "20px", // Tăng khoảng cách giữa các nhóm cột
      // barGap: '5%',
    },
    {
      data: seriesDataMapSell,
      type: "bar",
      stack: "a",
      emphasis: { label: { color: "red" }, scale: true },
      itemStyle: {
        color: "#E43637",
        type: "sell",
      },
      barMinWidth: "16px", // Tăng độ rộng tối thiểu của mỗi cột
      // barMaxWidth: '20px', // Tăng độ rộng tối đa của mỗi cột
      barCategoryGap: "20px", // Tăng khoảng cách giữa các nhóm cột
      // barGap: '5%',
    },
    {
      data: seriesDataMapATO,
      type: "bar",
      stack: "a",
      emphasis: { label: { color: "red" }, scale: true },
      itemStyle: {
        color: "#CCAA00",
        type: "ATO",
      },
      barMinWidth: "16px", // Tăng độ rộng tối thiểu của mỗi cột
      // barMaxWidth: '20px', // Tăng độ rộng tối đa của mỗi cột
      barCategoryGap: "20px", // Tăng khoảng cách giữa các nhóm cột
      // barGap: '5%',
    },
    {
      data: seriesDataMapATC,
      type: "bar",
      stack: "a",
      emphasis: { label: { color: "#149397" }, scale: false },
      itemStyle: {
        color: "#CCAA01",
        type: "ATC",
      },
      barMinWidth: "16px", // Tăng độ rộng tối thiểu của mỗi cột
      // barMaxWidth: '20px', // Tăng độ rộng tối đa của mỗi cột
      barCategoryGap: "20px", // Tăng khoảng cách giữa các nhóm cột
      // barGap: '5%',
    },
  ];

  const stackInfo = {};
  for (let i = 0; i < series[0].data.length; ++i) {
    for (let j = 0; j < series.length; ++j) {
      const stackName = series[j].stack;
      if (!stackName) {
        continue;
      }
      if (!stackInfo[stackName]) {
        stackInfo[stackName] = {
          stackStart: [],
          stackEnd: [],
        };
      }
      const info = stackInfo[stackName];
      const data = series[j].data[i];
      if (data && data !== "-") {
        if (info.stackStart[i] == null) {
          info.stackStart[i] = j;
        }
        info.stackEnd[i] = j;
      }
    }
  }
  for (let i = 0; i < series.length; ++i) {
    const data = series[i].data;
    const info = stackInfo[series[i]?.stack];
    for (let j = 0; j < series[i].data.length; ++j) {
      // const isStart = info.stackStart[j] === i;
      const isEnd = info.stackEnd[j] === i;
      const topBorder = isEnd ? 4 : 0;
      const bottomBorder = 0;
      data[j] = {
        value: data[j],
        itemStyle: {
          borderRadius: [bottomBorder, topBorder, topBorder, bottomBorder],
        },
      };
    }
  }

  const emphasisStyle = {
    itemStyle: {
      shadowBlur: 10,
      shadowColor: "rgba(0,0,0,0.3)",
    },
  };
  const xAxisData = ["24/07", "26/07", "28/07", "01/08", "03/08"];
  const data4 = [-200, 100, 150, -50, 10];
  const dataWithColors = data4.map((value) => {
    return {
      value: value,
      itemStyle: {
        color: value > 0 ? "rgba(66, 167, 50, 1)" : "rgba(228, 54, 55, 1)",
      },
    };
  });

  const optionInformation = {
    legend: {
      data: [],
      left: "10%",
    },
    tooltip: {},
    xAxis: {
      data: xAxisData,
      name: "",
      axisLine: { onZero: true },
      splitLine: { show: false },
      splitArea: { show: false },
    },
    yAxis: {},
    grid: {
      bottom: 100,
    },
    series: [
      {
        name: "bar4",
        type: "bar",
        stack: "two",
        // Here we use the dataWithColors array
        data: dataWithColors,
      },
    ],
  };

  const onChangeTrendingLine = (trendingLine: any) => {
    setListMatch((prevListMatch: any) => {
      const listMatchNew = [];
      for (let i = 0; i < trendingLine?.length; i++) {
        const element = trendingLine[i];

        // let itemOld = prevListMatch.find((item2) => {
        //   return item2.id === element.id;
        // });
        // if (itemOld) {
        //   listMatchNew.push({
        //     ...itemOld,
        //     ...element,
        //   });
        // }
        const listItemOld = prevListMatch.filter((item2: any) => {
          return item2.id === element.id;
        });

        for (let j = 0; j < listItemOld?.length; j++) {
          const itemOld = listItemOld[j];
          listMatchNew.push({
            ...itemOld,
            ...element,
          });
        }
      }
      return listMatchNew;
    });
    setTrendingLine((prevTrendingLine) => {
      const prevTrendingLineMap = trendingLine?.map((item: any) => {
        const itemOld: any = prevTrendingLine.find((item2: any) => {
          return item2.id === item.id;
        });
        if (itemOld) {
          return {
            ...itemOld,
            ...item,
          };
        } else {
          return item;
        }
      });
      return prevTrendingLineMap;
    });
  };
  const onChangeIndicator = (indicator: any) => {
    setCommonIndicator(indicator);
  };
  const onChangePosition = (position: any) => {
    if (position?.length > 0) {
      setTrendingLine((prevTrendingLine: any) => {
        const listMatchNew: any = [];
        for (let i = 0; i < prevTrendingLine?.length; i++) {
          const element = prevTrendingLine[i];
          if (element?.position !== position[i]?.position) {
            listMatchNew.push({
              ...element,
              position: position[i]?.position,
              curPrice: position[i]?.curPrice,
              time: position[i]?.time,
              message: position[i]?.message,
            });
          }
        }
        setListMatch((prevListMatch: any) => {
          return [...prevListMatch, ...listMatchNew];
        });
        return prevTrendingLine.map((item: any, index: any) => {
          return {
            ...item,
            position: position[index]?.position,
            curPrice: position[index]?.curPrice,
            time: position[index]?.time,
            // message: 'Đường kháng cự/hỗ trợ',
          };
        });
      });
    }
  };
  const onChangeSymbol = (symbolInfo: any) => {
    const symbolName = symbolInfo?.name;
    // setTrendingLine([]);
    // setListMatch([]);
    setListTabs((prevListTabs) => {
      return prevListTabs.map((item) => {
        return {
          ...item,
          symbol: item?.isPicked ? symbolName : item.symbol,
        };
      });
    });
    setCurTab((prevCurTab) => {
      return {
        ...prevCurTab,
        symbol: symbolName,
        SignalInfo: null,
        SignalID: null,
        forceChange: null,
      };
    });
  };
  useEffect(() => {
    if (!!code) {
      const newListTabs = listTabs?.map((item: any, index: any) => {
        return index === 0
          ? {
              symbol: code ? code.toUpperCase() : "SSI",
              resolution: "1D",
              isPicked: true,
              isHover: false,
            }
          : {
              ...item,
              isPicked: false,
              isHover: false,
            };
      });

      setListTabs(newListTabs);

      // setCurTab((prevCurTab) => {
      //   return {
      //     ...prevCurTab,
      //     symbol: code ? code.toUpperCase() : 'SSI',
      //   };
      // });
      // setCurTab(newListTabs[0]);
    }
  }, [code]);

  const onChangeResolution = (resolution: any) => {
    setListTabs((prevListTabs) => {
      return prevListTabs.map((item) => {
        return {
          ...item,
          resolution: item?.isPicked ? resolution : item.resolution,
        };
      });
    });
    setCurTab((prevCurTab) => {
      return {
        ...prevCurTab,
        resolution: resolution,
      };
    });
  };

  const onChangeTab = (id: any) => {
    const newListTabs = listTabs.map((item, index) => {
      return {
        ...item,
        isPicked: index === id ? true : false,
      };
    });
    setListTabs(newListTabs);
    setCurTab(newListTabs[id]);
  };

  const onRemoveTab = (id: any) => {
    if (listTabs?.length === 1) {
      alert("Cần ít nhất 1 biểu đồ");
      return;
    }
    let newListTabs = listTabs.filter((item, index) => index !== id);
    //if removeTab is curTab => set new curTab
    if (listTabs[id].isPicked) {
      newListTabs = newListTabs.map((item, index) => {
        return {
          ...item,
          isPicked: index === newListTabs?.length - 1 ? true : false,
        };
      });
    }
    setListTabs(newListTabs);
    setCurTab(newListTabs[newListTabs?.length - 1]);
  };

  const addNewTab = () => {
    if (listTabs?.length >= 8) {
      alert("Nâng cấp vip để mở thêm tab");
      return;
    }
    let newListTabs = [
      ...listTabs,
      {
        symbol: "SSI",
        resolution: "1D",
        isPicked: false,
        isHover: false,
      },
    ];
    //set new tab is picked
    newListTabs = newListTabs.map((item, index) => {
      return {
        ...item,
        isPicked: index === newListTabs?.length - 1 ? true : false,
      };
    });
    setListTabs(newListTabs);
    setCurTab(newListTabs[newListTabs?.length - 1]);
  };

  const onHoverTab = (id: any) => {
    const newListTabs = listTabs.map((item, index) => {
      return {
        ...item,
        isHover: index === id ? true : false,
      };
    });
    setListTabs(newListTabs);
  };

  const onMouseLeaveTab = (id: any) => {
    const newListTabs = listTabs.map((item, index) => {
      return {
        ...item,
        isHover: false,
      };
    });
    setListTabs(newListTabs);
  };

  const onChange = (checked: boolean) => {};
  const signalAction = useSelector((state: any) => {
    return state?.chart?.someState;
  }); // Sử dụng state nếu action thay đổi state

  useEffect(() => {
    getListSignals();
    // Bạn có thể cần một điều kiện ở đây để chắc chắn rằng getListSignals được gọi đúng lúc
  }, [signalAction]);

  useEffect(() => {
    getListTieuChi();
    // Bạn có thể cần một điều kiện ở đây để chắc chắn rằng getListSignals được gọi đúng lúc
  }, []);

  const getListSignals = () => {
    axios
      .get(`${config.app.VITE_APP_API_URL}/signals`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setListSignal(res?.data?.signals);
      })
      .catch((error) => {
        console.error("Error fetching account info:", error);
      });
  };
  const getListTieuChi = () => {
    axios
      .get(`${config.app.VITE_APP_API_URL}/listChiTieu`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setListChiTieu(res?.data?.signals);
      })
      .catch((error) => {
        console.error("Error fetching account info:", error);
      });
  };
  const ChartTopBar: FC<any> = () => {
    return (
      <div className="frame-parent216">
        <div className="frame-parent217">
          <div className="frame-parent218">
            {listTabs?.map((item: any, index: any) => {
              return (
                <div
                  onMouseOver={() => {
                    onHoverTab(index);
                  }}
                  onMouseLeave={() => {
                    onMouseLeaveTab(index);
                  }}
                  key={index}
                  className={
                    item?.isPicked
                      ? "vuesaxlinearchart-container"
                      : "vuesaxlinearchart-parent"
                  }
                  onClick={() => {
                    onChangeTab(index);
                  }}
                >
                  <div className="rectangle-parent">
                    {item?.isPicked ? (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 22H21"
                          stroke={screenMode === "dark" ? "#fff" : "#333"}
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M5.59998 8.37988H4C3.45 8.37988 3 8.82988 3 9.37988V17.9999C3 18.5499 3.45 18.9999 4 18.9999H5.59998C6.14998 18.9999 6.59998 18.5499 6.59998 17.9999V9.37988C6.59998 8.82988 6.14998 8.37988 5.59998 8.37988Z"
                          stroke={screenMode === "dark" ? "#fff" : "#333"}
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12.8002 5.19043H11.2002C10.6502 5.19043 10.2002 5.64043 10.2002 6.19043V18.0004C10.2002 18.5504 10.6502 19.0004 11.2002 19.0004H12.8002C13.3502 19.0004 13.8002 18.5504 13.8002 18.0004V6.19043C13.8002 5.64043 13.3502 5.19043 12.8002 5.19043Z"
                          stroke={screenMode === "dark" ? "#fff" : "#333"}
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M20.0004 2H18.4004C17.8504 2 17.4004 2.45 17.4004 3V18C17.4004 18.55 17.8504 19 18.4004 19H20.0004C20.5504 19 21.0004 18.55 21.0004 18V3C21.0004 2.45 20.5504 2 20.0004 2Z"
                          stroke={screenMode === "dark" ? "#fff" : "#333"}
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 22H21"
                          stroke={screenMode === "dark" ? "#abb3bf" : "#a3a09b"}
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M5.59998 8.37988H4C3.45 8.37988 3 8.82988 3 9.37988V17.9999C3 18.5499 3.45 18.9999 4 18.9999H5.59998C6.14998 18.9999 6.59998 18.5499 6.59998 17.9999V9.37988C6.59998 8.82988 6.14998 8.37988 5.59998 8.37988Z"
                          stroke={screenMode === "dark" ? "#abb3bf" : "#a3a09b"}
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12.8002 5.19043H11.2002C10.6502 5.19043 10.2002 5.64043 10.2002 6.19043V18.0004C10.2002 18.5504 10.6502 19.0004 11.2002 19.0004H12.8002C13.3502 19.0004 13.8002 18.5504 13.8002 18.0004V6.19043C13.8002 5.64043 13.3502 5.19043 12.8002 5.19043Z"
                          stroke={screenMode === "dark" ? "#abb3bf" : "#a3a09b"}
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M20.0004 2H18.4004C17.8504 2 17.4004 2.45 17.4004 3V18C17.4004 18.55 17.8504 19 18.4004 19H20.0004C20.5504 19 21.0004 18.55 21.0004 18V3C21.0004 2.45 20.5504 2 20.0004 2Z"
                          stroke={screenMode === "dark" ? "#abb3bf" : "#a3a09b"}
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    )}
                  </div>

                  <div className="volume">
                    {item?.symbol} ({item?.resolution})
                  </div>
                  <div
                    style={{
                      visibility:
                        item?.isPicked || item?.isHover ? "visible" : "hidden",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveTab(index);
                    }}
                    className="edit-path"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.15411 7L13.9578 0.281288C14.0551 0.169632 13.9733 0 13.8229 0H12.0586C11.9547 0 11.8552 0.045092 11.7867 0.122393L7 5.66442L2.21332 0.122393C2.147 0.045092 2.0475 0 1.94138 0H0.177052C0.0267085 0 -0.0550963 0.169632 0.0421849 0.281288L5.84589 7L0.0421849 13.7187C0.020393 13.7436 0.00641268 13.774 0.00190318 13.8064C-0.00260632 13.8388 0.00254441 13.8717 0.0167444 13.9014C0.0309444 13.931 0.0535972 13.956 0.0820128 13.9735C0.110428 13.991 0.143414 14.0002 0.177052 14H1.94138C2.04529 14 2.14479 13.9549 2.21332 13.8776L7 8.33558L11.7867 13.8776C11.853 13.9549 11.9525 14 12.0586 14H13.8229C13.9733 14 14.0551 13.8304 13.9578 13.7187L8.15411 7Z"
                        fill={screenMode === "dark" ? "#fff" : "#333"}
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="iconoutlinedsuggestedplus-parent">
            <div
              className="edit-path"
              onClick={() => {
                addNewTab();
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.29688 0.5625H9.70312C9.82812 0.5625 9.89062 0.625 9.89062 0.75V17.25C9.89062 17.375 9.82812 17.4375 9.70312 17.4375H8.29688C8.17188 17.4375 8.10938 17.375 8.10938 17.25V0.75C8.10938 0.625 8.17188 0.5625 8.29688 0.5625Z"
                  fill={screenMode === "dark" ? "#fff" : "#a3a09b"}
                />
                <path
                  d="M1.125 8.10938H16.875C17 8.10938 17.0625 8.17188 17.0625 8.29688V9.70312C17.0625 9.82812 17 9.89062 16.875 9.89062H1.125C1 9.89062 0.9375 9.82812 0.9375 9.70312V8.29688C0.9375 8.17188 1 8.10938 1.125 8.10938Z"
                  fill={screenMode === "dark" ? "#fff" : "#a3a09b"}
                />
              </svg>
            </div>

            <div className="edit-path">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.79682 2.53901L4.82573 1.5101C4.85051 1.4852 4.86781 1.45384 4.87565 1.41959C4.88349 1.38534 4.88157 1.34957 4.87009 1.31636C4.85861 1.28315 4.83805 1.25383 4.81073 1.23173C4.78341 1.20963 4.75045 1.19564 4.71557 1.19135L0.960884 0.748384C0.841353 0.734322 0.738228 0.835103 0.75229 0.956978L1.19526 4.71167C1.21401 4.86635 1.40385 4.93198 1.51401 4.82182L2.53823 3.7976L5.67182 6.92885C5.74448 7.00151 5.86401 7.00151 5.93667 6.92885L6.93042 5.93745C7.00307 5.86479 7.00307 5.74526 6.93042 5.6726L3.79682 2.53901ZM12.0632 6.92885C12.1359 7.00151 12.2554 7.00151 12.3281 6.92885L15.4617 3.7976L16.4859 4.82182C16.5108 4.84661 16.5422 4.8639 16.5764 4.87174C16.6107 4.87959 16.6464 4.87766 16.6796 4.86618C16.7128 4.85471 16.7422 4.83414 16.7643 4.80682C16.7864 4.77951 16.8003 4.74654 16.8046 4.71167L17.2476 0.959322C17.2617 0.83979 17.1609 0.736666 17.039 0.750728L13.2843 1.1937C13.1296 1.21245 13.064 1.40229 13.1742 1.51245L14.2031 2.54135L11.0695 5.67026C11.0346 5.7055 11.015 5.75309 11.015 5.80268C11.015 5.85227 11.0346 5.89986 11.0695 5.9351L12.0632 6.92885ZM16.8046 13.2851C16.7859 13.1304 16.596 13.0648 16.4859 13.1749L15.4617 14.1992L12.3281 11.0679C12.2928 11.033 12.2452 11.0134 12.1956 11.0134C12.1461 11.0134 12.0985 11.033 12.0632 11.0679L11.0695 12.0593C11.0346 12.0946 11.015 12.1422 11.015 12.1917C11.015 12.2413 11.0346 12.2889 11.0695 12.3242L14.2031 15.4578L13.1742 16.4867C13.1494 16.5116 13.1321 16.5429 13.1242 16.5772C13.1164 16.6114 13.1183 16.6472 13.1298 16.6804C13.1413 16.7136 13.1618 16.7429 13.1892 16.765C13.2165 16.7871 13.2494 16.8011 13.2843 16.8054L17.039 17.2484C17.1585 17.2624 17.2617 17.1617 17.2476 17.0398L16.8046 13.2851ZM5.93667 11.0679C5.90142 11.033 5.85384 11.0134 5.80424 11.0134C5.75465 11.0134 5.70706 11.033 5.67182 11.0679L2.53823 14.1992L1.51401 13.1749C1.4891 13.1502 1.45774 13.1329 1.42349 13.125C1.38924 13.1172 1.35348 13.1191 1.32027 13.1306C1.28706 13.1421 1.25774 13.1626 1.23564 13.1899C1.21354 13.2173 1.19955 13.2502 1.19526 13.2851L0.75229 17.0374C0.738228 17.157 0.839009 17.2601 0.960884 17.246L4.71557 16.8031C4.87026 16.7843 4.93588 16.5945 4.82573 16.4843L3.79682 15.4578L6.93042 12.3265C7.00307 12.2539 7.00307 12.1343 6.93042 12.0617L5.93667 11.0679Z"
                  fill={screenMode === "dark" ? "#fff" : "#a3a09b"}
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const onChooseSignal = (item: any) => {
    setCurTab({
      symbol: item?.symbol,
      resolution: "1D",
      isPicked: true,
      isHover: false,
      forceChange: null,
      ...item,
    });
  };
  const onChooseTieuChi = (item: any) => {
    let signalInfo = JSON.parse(item?.SignalInfo);
    let symbolInfo = JSON.parse(item?.symbol);
    setListSymbolPicked(symbolInfo);
    setListTieuChi(signalInfo);
  };
  return (
    <StyledStockFilter screen_mode={screenMode}>
      <div className={"root"}>
        <div className={"frameParent844"}>
          <div className={"frameParent845"}>
            <Targets
              pickerPopular={pickerPopular}
              setPickerPopular={setPickerPopular}
              pickerBasic={pickerBasic}
              setPickerBasic={setPickerBasic}
              pickerTechnique={pickerTechnique}
              setPickerTechnique={setPickerTechnique}
              pickerFluctuation={pickerFluctuation}
              setPickerFluctuation={setPickerFluctuation}
              pickerMyFilter={pickerMyFilter}
              setPickerMyFilter={setPickerMyFilter}
              handleClickQuy={handleClickQuy}
              handleClearTieuChi={handleClearTieuChi}
              currentChangePercent={currentChangePercent}
              setIsHoverClear={setIsHoverClear}
              handleClickListItemRight={handleClickListItemRight}
              trendingLine={trendingLine}
              setTrendingLine={setTrendingLine}
              handleClickListItemLeft={handleClickListItemLeft}
              listSignal={listSignal}
              listChiTieuAll={listChiTieu}
              handleClickListItemInterval={handleClickListItemInterval}
              currentChangeTieuChi={currentChangeTieuChi}
              currentChangeTieuChiInterval={currentChangeTieuChiInterval}
              currentChangeTieuChiLeft={currentChangeTieuChiLeft}
              priceDown={priceDown}
              currentChangeTieuChiRight={currentChangeTieuChiRight}
              curTab={curTab}
              currentChangeTieuChiQuy={currentChangeTieuChiQuy}
              setPriceUp={setPriceUp}
              totalResult={totalResult}
              setPriceDown={setPriceDown}
              tabMenuTarget={tabMenuTarget}
              setTabMenuTarget={setTabMenuTarget}
              listMyFilter={listMyFilter}
              setListMyFilter={setListMyFilter}
              handleClickListItem={handleClickListItem}
              setSearchCriteria={setSearchCriteria}
              currentChangeSession={currentChangeSession}
              searchCriteria={searchCriteria}
              isHoverChiTieu={isHoverChiTieu}
              selectedValue={selectedValue}
              setSelectedChild={setSelectedChild}
              selectedChild={selectedChild}
              handleToggle={handleToggle}
              onFilter={onFilter}
              setIsHoverChiTieu={setIsHoverChiTieu}
              setSelectedValue={setSelectedValue}
              listTieuChiPicked={listTieuChiPicked}
              setListTieuChiPicked={setListTieuChiPicked}
              scrollToBottom={scrollToBottom}
              setListIdConfig={setListIdConfig}
              listIdConfig={listIdConfig}
              handleChangeSelectIndex={handleChangeSelectIndex}
              onSaveSignal={onSaveSignal}
              onSaveListChiTieu={onSaveListChiTieu}
              handleClickListItemSession={handleClickListItemSession}
              priceUp={priceUp}
              listTieuChi={listTieuChi}
              listSymbol={listSymbol}
              setListSymbol={setListSymbol}
              listSymbolPicked={listSymbolPicked}
              setListSymbolPicked={setListSymbolPicked}
              setListTieuChi={setListTieuChi}
            />
            {tabMenuTarget === "target" ? (
              <></>
            ) : (
              <Value
                getListSignals={getListSignals}
                getListTieuChi={getListTieuChi}
                onChooseSignal={onChooseSignal}
                onChooseTieuChi={onChooseTieuChi}
                curTab={curTab}
                setCurTab={setCurTab}
                user={user}
                listSignal={listSignal}
                listChiTieuAll={listChiTieu}
                tabMenuTarget={tabMenuTarget}
                setTabMenuTarget={setTabMenuTarget}
                totalResult={totalResult}
                handleCloseSession={handleCloseSession}
                setAnchorQuy={setAnchorQuy}
                setDay={setDay}
                day={day}
                open={open}
                onFilter={onFilter}
                setRows={setRows}
                rows={rows}
                handleToggle={handleToggle}
                setListTieuChiPicked={setListTieuChiPicked}
                listTieuChiPicked={listTieuChiPicked}
                anchorElLeft={anchorElLeft}
                anchorQuy={anchorQuy}
                openLeft={openLeft}
                handleCloseLeft={handleCloseLeft}
                currentChangeTieuChiLeft={currentChangeTieuChiLeft}
                anchorEl={anchorEl}
                handleClose={handleClose}
                currentChangeTieuChi={currentChangeTieuChi}
                anchorElRight={anchorElRight}
                openRight={openRight}
                handleCloseRight={handleCloseRight}
                currentChangeTieuChiRight={currentChangeTieuChiRight}
                anchorElInterval={anchorElInterval}
                openInterval={openInterval}
                handleCloseInterval={handleCloseInterval}
                openMonth={openMonth}
                handleCloseMonth={handleCloseMonth}
                currentChangeTieuChiInterval={currentChangeTieuChiInterval}
                currentChangeTieuChiQuy={currentChangeTieuChiQuy}
                bottomEl={bottomEl}
                isHoverRight={isHoverRight}
                isHoverInterval={isHoverInterval}
                isHoverQuy={isHoverQuy}
                setIsHoverQuy={setIsHoverQuy}
                isHoverLeft={isHoverLeft}
                isHoverClear={isHoverClear}
                setIsHoverClear={setIsHoverClear}
                setIsHoverRight={setIsHoverRight}
                setIsHoverLeft={setIsHoverLeft}
                setIsHoverInterval={setIsHoverInterval}
                handleClickListItemLeft={handleClickListItemLeft}
                handleClickListItem={handleClickListItem}
                handleChangeSelectIndex={handleChangeSelectIndex}
                handleClickListItemInterval={handleClickListItemInterval}
                handleClickQuy={handleClickQuy}
                handleClickListItemRight={handleClickListItemRight}
                handleClearTieuChi={handleClearTieuChi}
                openSession={openSession}
                setCurrentChangeSession={setCurrentChangeSession}
                currentChangeSession={currentChangeSession}
                setIsHoverSession={setIsHoverSession}
                isHoverSession={isHoverSession}
                handleClickListItemSession={handleClickListItemSession}
                anchorElSession={anchorElSession}
                handleClickListItemPercent={handleClickListItemPercent}
                setAnchorEl={setAnchorEl}
                openPercent={openPercent}
                setCurrentChangePercent={setCurrentChangePercent}
                currentChangePercent={currentChangePercent}
                isHoverPercent={isHoverPercent}
                setIsHoverPercent={setIsHoverPercent}
                handleClosePercent={handleClosePercent}
                anchorElPerCent={anchorElPerCent}
                handleClickListBoolean={handleClickListBoolean}
                setIsHoverBoolean={setIsHoverBoolean}
                isHoverBoolean={isHoverBoolean}
                setCurrentChangeBoolean={setCurrentChangeBoolean}
                currentChangeBoolean={currentChangeBoolean}
                openBoolean={openBoolean}
                anchorElBoolean={anchorElBoolean}
                setAnchorElBoolean={setAnchorElBoolean}
                handleCloseBoolean={handleCloseBoolean}
                setListIdConfig={setListIdConfig}
                listIdConfig={listIdConfig}
              />
            )}
          </div>
          <div
            className="table"
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {tabMenuTarget === "congcu" ? (
              <>
                {/* <ChartTopBar /> */}
                <TVChartContainer
                  screenMode={screenMode}
                  theme={screenMode}
                  activeTab={activeTab}
                  onChangeSymbol={onChangeSymbol}
                  onChangeResolution={onChangeResolution}
                  listTabs={listTabs}
                  onChangeIndicator={onChangeIndicator}
                  curTab={curTab}
                  onChangeTrendingLine={onChangeTrendingLine}
                  trendingLineMessage={trendingLine}
                  onChangePosition={onChangePosition}
                  setCurTab={setCurTab}
                  // tvWidget={tvWidget}
                  // setTvWidget={setTvWidget}
                />
              </>
            ) : (
              <ResultTable
                tabMenuTarget={tabMenuTarget}
                setTabMenuTarget={setTabMenuTarget}
                totalResult={totalResult}
                loading={loading}
                setLoading={setLoading}
                pageTable={pageTable}
                setPageTable={setPageTable}
                setRows={setRows}
                rows={rows}
                setTab={setTab}
                tab={tab}
                columns={columns}
                pageSize={pageSize}
                setPageSize={setPageSize}
                totalFin={totalFin}
              />
            )}
          </div>
        </div>
        {/* <TimePicker /> */}
      </div>
    </StyledStockFilter>
  );
};

export default StockFilter;
```
