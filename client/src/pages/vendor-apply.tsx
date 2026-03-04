import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertVendorSchema } from "@shared/schema";
import { CheckCircle, Leaf, Award, Users, Globe } from "lucide-react";

const vendorApplicationSchema = insertVendorSchema.extend({
  name: z.string().min(1, "Business name is required"),
  description: z.string().min(1, "Description is required"),
  website: z.string().optional(),
  location: z.string().min(1, "Location is required"),
  practices: z.string().min(1, "Regenerative practices are required"),
  contactEmail: z.string().email("Valid email is required"),
  agreedToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

type VendorApplicationData = z.infer<typeof vendorApplicationSchema>;

export default function VendorApply() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<VendorApplicationData>({
    resolver: zodResolver(vendorApplicationSchema),
    defaultValues: {
      name: "",
      description: "",
      website: "",
      location: "",
      certifications: [],
      practices: "",
      contactEmail: "",
      agreedToTerms: false,
    },
  });

  const createVendorMutation = useMutation({
    mutationFn: async (data: VendorApplicationData) => {
      const { agreedToTerms, ...vendorData } = data;
      return apiRequest("POST", "/api/vendors", vendorData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/vendors"] });
      setIsSubmitted(true);
      toast({
        title: "Application Submitted!",
        description: "We'll review your application and get back to you within 5-7 business days.",
      });
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: VendorApplicationData) => {
    createVendorMutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-regen-forest mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-earth-dark mb-4">
            Application Submitted Successfully!
          </h1>
          <p className="text-lg text-earth-medium mb-8 max-w-2xl mx-auto">
            Thank you for your interest in joining RegenDirectory. We'll carefully review your application and reach out within 5-7 business days with next steps.
          </p>
          <div className="bg-earth-light rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="font-semibold text-earth-dark mb-4">What happens next?</h3>
            <div className="space-y-3 text-sm text-earth-medium text-left">
              <div className="flex items-start">
                <div className="w-6 h-6 bg-regen-teal text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">1</div>
                <div>
                  <p className="font-medium">Application Review</p>
                  <p>Our team will verify your regenerative practices and certifications.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-regen-teal text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">2</div>
                <div>
                  <p className="font-medium">Verification Process</p>
                  <p>We may request additional documentation or schedule a brief call.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-6 h-6 bg-regen-teal text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">3</div>
                <div>
                  <p className="font-medium">Welcome to the Directory</p>
                  <p>Once approved, we'll help you set up your vendor profile and list your products.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-earth-light py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-earth-dark mb-6">
            Join RegenDirectory as a Vendor
          </h1>
          <p className="text-xl text-earth-medium max-w-3xl mx-auto">
            Connect with conscious consumers who value regenerative practices. Share your story and grow your impact in the regenerative movement.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="pt-6 text-center">
              <Users className="h-12 w-12 text-regen-teal mx-auto mb-4" />
              <h3 className="font-semibold text-earth-dark mb-2">Reach Conscious Consumers</h3>
              <p className="text-sm text-earth-medium">
                Connect with customers who actively seek regenerative products
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <Award className="h-12 w-12 text-regen-teal mx-auto mb-4" />
              <h3 className="font-semibold text-earth-dark mb-2">Showcase Your Practices</h3>
              <p className="text-sm text-earth-medium">
                Highlight your regenerative methods and certifications
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <Globe className="h-12 w-12 text-regen-teal mx-auto mb-4" />
              <h3 className="font-semibold text-earth-dark mb-2">Grow Your Impact</h3>
              <p className="text-sm text-earth-medium">
                Be part of a movement healing our planet through commerce
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Application Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Leaf className="h-6 w-6 text-regen-forest mr-2" />
              Vendor Application Form
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-earth-dark">Basic Information</h3>
                  
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business/Brand Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Your business or brand name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input placeholder="https://yourwebsite.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location *</FormLabel>
                        <FormControl>
                          <Input placeholder="City, State/Province, Country" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* About Your Business */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-earth-dark">About Your Business</h3>
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Description *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your business, mission, and what makes your products regenerative..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="practices"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Regenerative Practices *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your specific regenerative practices (e.g., cover cropping, composting, rotational grazing, etc.)"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Certifications */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-earth-dark">Certifications</h3>
                  <p className="text-sm text-earth-medium">
                    Select any certifications you currently hold. While not required, certifications help build trust with consumers.
                  </p>
                  
                  <FormField
                    control={form.control}
                    name="certifications"
                    render={({ field }) => (
                      <FormItem>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            "Regenerative Organic Certified",
                            "USDA Organic",
                            "B Corp Certified",
                            "Carbon Negative",
                            "Certified Naturally Grown",
                            "EPA Safer Choice",
                            "Leaping Bunny",
                            "Cradle to Cradle",
                          ].map((cert) => (
                            <div key={cert} className="flex items-center space-x-2">
                              <Checkbox
                                checked={field.value?.includes(cert)}
                                onCheckedChange={(checked) => {
                                  const current = field.value || [];
                                  if (checked) {
                                    field.onChange([...current, cert]);
                                  } else {
                                    field.onChange(current.filter((c) => c !== cert));
                                  }
                                }}
                              />
                              <label className="text-sm text-earth-medium cursor-pointer">
                                {cert}
                              </label>
                            </div>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Terms and Conditions */}
                <div className="border-t pt-6">
                  <FormField
                    control={form.control}
                    name="agreedToTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm">
                            I agree to the terms and conditions *
                          </FormLabel>
                          <p className="text-xs text-earth-medium">
                            By checking this box, you agree to our vendor terms, quality standards, and commitment to regenerative practices verification.
                          </p>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-regen-teal hover:bg-regen-forest text-white"
                  disabled={createVendorMutation.isPending}
                >
                  {createVendorMutation.isPending ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
