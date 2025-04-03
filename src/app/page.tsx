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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

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
                placeholder={
                  selectedMode === "1" 
                    ? "Example: 180mg/dl"
                  : selectedMode === "2" 
                    ? "Example: 10mol/l"
                  : selectedMode === "auto" 
                    ? "Example: 180mg/dl or 10mol/l"
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
    <Accordion type="single" collapsible className="w-64 md:w-96 mt-4">
      <AccordionItem value="item-1">
        <AccordionTrigger>How does the auto mode work?</AccordionTrigger>
        <AccordionContent>
          If the input is 35 or less, the auto mode assumes that the input is in mmol/l and converts it to mg/dl. If the input is greater than 35, the auto mode assumes that the input is in mg/dl and converts it to mmol/l.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>What if the auto mode does not work?</AccordionTrigger>
        <AccordionContent>
          You can always manually select the conversion mode.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Who is the creator? Can I support him?</AccordionTrigger>
        <AccordionContent>
          Yes you can! You can support me on GitHub by following me there or by starring the repository.
          <Link href="https://y4.gg"> Click here to visit my website</Link>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
    </>
  )
}
