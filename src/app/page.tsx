"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

export default function Home() {
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    if (!inputValue || !selectedMode) {
      setResult("");
      return;
    }

    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      setResult("Invalid input");
      return;
    }

    if (selectedMode === "1") {
      // mg/dl to mmol/l conversion: divide by 18
      setResult((value / 18).toFixed(2) + " mmol/l");
    } else if (selectedMode === "2") {
      // mmol/l to mg/dl conversion: multiply by 18
      setResult((value * 18).toFixed(2) + " mg/dl");
    } else if (selectedMode === "auto") {
      // Auto detection logic
      if (value <= 35) {
        // Treat as mmol/l and convert to mg/dl
        setResult((value * 18).toFixed(2) + " mg/dl (auto-detected as mmol/l)");
      } else {
        // Treat as mg/dl and convert to mmol/l
        setResult((value / 18).toFixed(2) + " mmol/l (auto-detected as mg/dl)");
      }
    }
  }, [inputValue, selectedMode]);
  return (
    <>
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Blood Sugar Converter</CardTitle>
        <CardDescription>
          Convert mg/dl to mmol/l and vice versa
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="mode">Convertion Mode</Label>
              <Select onValueChange={(value) => {
                setSelectedMode(value);
                setInputValue("");
                setResult("");
                }}>
                <SelectTrigger id="mode" className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="1">From mg/dl to mmol/l</SelectItem>
                  <SelectItem value="2">From mol/l to mg/dl</SelectItem>
                  <SelectItem value="auto">Auto Detection - Beta</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="unit">
                  {selectedMode === "1" 
                  ? "Unit (mg/dl)" 
                  : selectedMode === "2" 
                    ? "Unit (mmol/l)" 
                    : "Unit (mg/dl or mmol/l)"}
              </Label>
              <Input 
                id="unit" 
                type="decimal"
                min="0" 
                placeholder={selectedMode === "1" 
                  ? "Example: 180mg/dl"
                  : selectedMode === "2" 
                    ? "Example: 10mol/l"
                    : "Select Mode first"} 
                disabled={!selectedMode}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="result">
              {
                selectedMode === "1" 
                ? "Result (mol/l)" 
                : selectedMode === "2" 
                  ? "Result (mg/dl)" 
                : "Result (mg/dl or mmol/l)"
              } 
            </Label>
            <Input 
              id="result" 
              placeholder="Result will be displayed here" 
              value={result}
              readOnly
              disabled
            />
          </div>
        </div>
      </CardFooter>
    </Card>
    </>
  )
}
