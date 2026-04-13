import type { Meta, StoryObj } from "@storybook/react";
import {
  SkeletonTable,
  SkeletonCard,
  SkeletonCardGrid,
  SkeletonForm,
  SkeletonList,
  SkeletonDashboard,
  SkeletonKpiCard,
  SkeletonKpiCardGroup,
  SkeletonProfile,
} from "../components/ui/skeleton-variants";

const meta: Meta = {
  title: "UI/SkeletonVariants",
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj;

export const Table: Story = {
  render: () => <SkeletonTable rows={5} columns={4} showHeader />,
  name: "SkeletonTable",
};

export const TableNoHeader: Story = {
  render: () => <SkeletonTable rows={3} columns={3} showHeader={false} />,
  name: "SkeletonTable — sin header",
};

export const SingleCard: Story = {
  render: () => <SkeletonCard hasImage />,
  name: "SkeletonCard",
};

export const CardGrid: Story = {
  render: () => <SkeletonCardGrid count={6} />,
  name: "SkeletonCardGrid",
};

export const Form: Story = {
  render: () => <SkeletonForm fields={4} />,
  name: "SkeletonForm",
};

export const List: Story = {
  render: () => <SkeletonList items={5} variant="detailed" />,
  name: "SkeletonList",
};

export const KpiCard: Story = {
  render: () => <SkeletonKpiCard />,
  name: "SkeletonKpiCard",
};

export const KpiCardGroup: Story = {
  render: () => <SkeletonKpiCardGroup count={4} />,
  name: "SkeletonKpiCardGroup",
};

export const Profile: Story = {
  render: () => <SkeletonProfile />,
  name: "SkeletonProfile",
};

export const Dashboard: Story = {
  render: () => <SkeletonDashboard />,
  name: "SkeletonDashboard — full layout",
};
