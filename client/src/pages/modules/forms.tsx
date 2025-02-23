import { useStore } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Forms() {
  const { updateProgress } = useStore();

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Modules
          </Button>
        </Link>

        <h1 className="text-3xl font-bold text-emerald-400 mb-6">Form Elements Practice</h1>
        
        <Card className="bg-slate-800 p-6 mb-6">
          <form className="space-y-6">
            <div>
              <Label>Select Options</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Option 1</SelectItem>
                  <SelectItem value="2">Option 2</SelectItem>
                  <SelectItem value="3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Checkboxes</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="checkbox1" />
                  <Label htmlFor="checkbox1">Checkbox 1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="checkbox2" />
                  <Label htmlFor="checkbox2">Checkbox 2</Label>
                </div>
              </div>
            </div>

            <div>
              <Label>Radio Buttons</Label>
              <RadioGroup defaultValue="1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="radio1" />
                  <Label htmlFor="radio1">Radio 1</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="radio2" />
                  <Label htmlFor="radio2">Radio 2</Label>
                </div>
              </RadioGroup>
            </div>

            <Button 
              onClick={() => updateProgress('forms', true)}
              className="w-full bg-emerald-600 hover:bg-emerald-700"
            >
              Complete Module
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}