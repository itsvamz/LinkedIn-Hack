
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, Star, Clock, DollarSign } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

const FilterPanel = () => {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [experienceRange, setExperienceRange] = useState([0, 10]);
  const [salaryRange, setSalaryRange] = useState([50, 200]);

  const roles = ['Frontend Developer', 'Backend Developer', 'Full Stack Developer', 'UX Designer', 'Product Manager', 'Data Scientist'];
  const skills = ['React', 'JavaScript', 'Python', 'AWS', 'Node.js', 'TypeScript', 'Docker', 'GraphQL'];
  const locations = ['San Francisco', 'New York', 'Austin', 'Seattle', 'Los Angeles', 'Chicago', 'Boston', 'Remote'];

  const toggleSelection = (item: string, selectedItems: string[], setSelectedItems: (items: string[]) => void) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <Card className="border-violet-100 shadow-lg">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Roles */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <Briefcase className="w-4 h-4 mr-2" />
                Roles
              </h3>
              <div className="space-y-2">
                {roles.map((role) => (
                  <Badge
                    key={role}
                    variant={selectedRoles.includes(role) ? "default" : "outline"}
                    className={`cursor-pointer text-xs ${
                      selectedRoles.includes(role) 
                        ? 'bg-violet-600 text-white' 
                        : 'border-violet-200 text-violet-600 hover:bg-violet-50'
                    }`}
                    onClick={() => toggleSelection(role, selectedRoles, setSelectedRoles)}
                  >
                    {role}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <Star className="w-4 h-4 mr-2" />
                Skills
              </h3>
              <div className="space-y-2">
                {skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant={selectedSkills.includes(skill) ? "default" : "outline"}
                    className={`cursor-pointer text-xs ${
                      selectedSkills.includes(skill) 
                        ? 'bg-violet-600 text-white' 
                        : 'border-violet-200 text-violet-600 hover:bg-violet-50'
                    }`}
                    onClick={() => toggleSelection(skill, selectedSkills, setSelectedSkills)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Locations */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                Location
              </h3>
              <div className="space-y-2">
                {locations.slice(0, 6).map((location) => (
                  <Badge
                    key={location}
                    variant={selectedLocations.includes(location) ? "default" : "outline"}
                    className={`cursor-pointer text-xs ${
                      selectedLocations.includes(location) 
                        ? 'bg-violet-600 text-white' 
                        : 'border-violet-200 text-violet-600 hover:bg-violet-50'
                    }`}
                    onClick={() => toggleSelection(location, selectedLocations, setSelectedLocations)}
                  >
                    {location}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Experience
              </h3>
              <div className="px-2">
                <Slider
                  value={experienceRange}
                  onValueChange={setExperienceRange}
                  max={15}
                  min={0}
                  step={1}
                  className="mb-2"
                />
                <div className="text-xs text-gray-600 flex justify-between">
                  <span>{experienceRange[0]} years</span>
                  <span>{experienceRange[1]}+ years</span>
                </div>
              </div>
            </div>

            {/* Salary */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                Salary (K)
              </h3>
              <div className="px-2">
                <Slider
                  value={salaryRange}
                  onValueChange={setSalaryRange}
                  max={300}
                  min={30}
                  step={10}
                  className="mb-2"
                />
                <div className="text-xs text-gray-600 flex justify-between">
                  <span>${salaryRange[0]}K</span>
                  <span>${salaryRange[1]}K+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex justify-between items-center mt-6 pt-4 border-t border-violet-100">
            <div className="text-sm text-gray-600">
              Showing {Math.floor(Math.random() * 50) + 50} candidates
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-violet-200 text-violet-600">
                Clear All
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-violet-600 to-purple-600">
                Apply Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FilterPanel;
